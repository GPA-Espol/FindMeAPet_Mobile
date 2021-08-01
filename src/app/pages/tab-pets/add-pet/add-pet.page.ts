import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from 'src/app/model/mascota.model';
import * as moment from 'moment';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';
import { PetObserverService } from 'src/app/observables/pet-observer.service';

/**
 * Component in charge of the behaviour of the add-pet page
 * @category Components
 */
@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.page.html',
  styleUrls: ['./add-pet.page.scss'],
})
export class AddPetPage implements OnInit {
  public mode: string = '';
  idPet: string;
  petToEdit: Mascota;
  extraInformation: boolean = false;
  ageType: string = '';
  mascota: FormGroup;
  administrador: Administrador;

  @ViewChild('imgPicker') imgPicker: ImagePickerComponent;
  constructor(
    private sistema: SistemaService,
    private alertaService: AlertaService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private petObserver: PetObserverService
  ) {}

  /**
   * Method that sets the page mode to edit o to anadir. The page funcionality is based on this mode.
   */
  setMode() {
    let route = this.router.url;
    let array = route.split('/');
    let end = array[array.length - 1];
    this.mode = end == 'anadir' ? end : 'editar';
    console.log(this.mode);
  }

  ngOnInit() {
    this.setMode();
    this.mascota = this.formBuilder.group({
      nombre: ['', Validators.required],
      color: ['', Validators.required],
      esterilizado: 0,
      adoptado: 0,
      caso_externo: 0,
      adoptable: 0,
      descripcion: ['', Validators.required],
      sexo: ['', Validators.required],
      ubicacion: ['', Validators.required],
      tipo: ['', Validators.required],
      years: '',
      months: '',
      days: '',
      image: '',
    });
    this.administrador = this.sistema.admin;
    if (this.mode == 'editar') {
      this.getData();
    }
  }

  /**
   * Method that set values to the form fields of the pet to edit
   */
  async getData() {
    this.idPet = this.route.snapshot.paramMap.get('id');
    this.petToEdit = await this.sistema.getMascotabyId(this.idPet);
    this.mascota.controls['nombre'].setValue(this.petToEdit.nombre);
    this.mascota.controls['color'].setValue(this.petToEdit.color);
    this.mascota.controls['caso_externo'].setValue(this.petToEdit.isCasoExterno);
    this.mascota.controls['esterilizado'].setValue(this.petToEdit.isEsterilizado);
    this.mascota.controls['adoptado'].setValue(this.petToEdit.isAdoptado);
    this.mascota.controls['adoptable'].setValue(this.petToEdit.isAdoptable);
    this.mascota.controls['sexo'].setValue(this.petToEdit.sexo);
    this.mascota.controls['ubicacion'].setValue(this.petToEdit.ubicacionMascota);
    this.mascota.controls['descripcion'].setValue(this.petToEdit.descripcion);
    this.mascota.controls['tipo'].setValue(this.petToEdit.tipoAnimal);
    this.setAgeInformation();
  }

  /**
   * Method that set the value of the pet object to be sent to the REST API, obtaining the information from the form
   * @param petToSend Mascota object to set values 
   */
  setValues(petToSend: Mascota) {
    petToSend.nombre = this.mascota.get('nombre').value;
    petToSend.fechaNacimiento = this.getBirthDate();
    petToSend.color = this.mascota.get('color').value;
    petToSend.isCasoExterno = this.mascota.get('caso_externo').value;
    petToSend.isEsterilizado = this.mascota.get('esterilizado').value;
    petToSend.isAdoptado = this.mascota.get('adoptado').value;
    petToSend.isAdoptable = this.mascota.get('adoptable').value;
    petToSend.sexo = this.mascota.get('sexo').value;
    petToSend.ubicacionMascota = this.mascota.get('ubicacion').value;
    petToSend.descripcion = this.mascota.get('descripcion').value;
    petToSend.tipoAnimal = this.mascota.get('tipo').value;
  }

  /**
   *  Handler that pushes the pet to the api for it to update it
   */
  async editPet() {
    this.setValues(this.petToEdit);
    this.petObserver.publish(this.petToEdit);
    await this.alertaService.presentLoading('Actualizando mascota');
    try {
      this.petToEdit.imagenUrl = await this.imgPicker.upload();
      await this.administrador.adminMascota.actualizarMascota(this.idPet, this.petToEdit);
      this.goback();
      await this.alertaService.presentToast('La mascota ha sido editada');
    } catch (err) {
      console.error('Error al editar mascota: ', err);
      this.alertaService.presentToast('Error al editar mascota, por favor intente de nuevo' + err);
    }
    this.alertaService.dismissLoading();
  }

  /**
   * Handler that pushes the new pet to the api and adds it to
   * the system pets array.
   */
  async createPet() {
    let newPet = new Mascota();
    this.setValues(newPet);
    if (!this.imgPicker.image64 && newPet.isAdoptable) {
      return await this.alertaService.presentToast('Por favor añada la imagen de la mascota');
    }
    await this.alertaService.presentLoading('Creando mascota');
    try {
      newPet.imagenUrl = await this.imgPicker.upload();
      await this.administrador.adminMascota.crearMascota(newPet);
      this.goback();
      await this.alertaService.presentToast('La mascota ha sido agregada');
    } catch (err) {
      console.error('Error al crear mascota: ', err);
      this.alertaService.presentToast('Error al guardar mascota, por favor intente de nuevo' + err);
    }
    this.alertaService.dismissLoading();
  }

  /**
   * Method that navigate to the home page with a go back animation
   */
  goback() {
    this.navCtrl.pop();
  }

  /**
   * Method that find the birth date of a pet based on its years old,
   * months old and days old.
   * @return {Date} The calculated date of its birth date.
   */
  getBirthDate() {
    let today = moment(new Date());
    today.subtract(this.mascota.get('years').value, 'years');
    today.subtract(this.mascota.get('months').value, 'months');
    today.subtract(this.mascota.get('days').value, 'days');
    return today.toDate();
  }

<<<<<<< HEAD
  /**
   * Method that set the age information in the form fields
   */
  setAgeInformation(){
=======
  setAgeInformation() {
>>>>>>> develop
    let information = this.getInformationAge();

    this.mascota.controls['years'].setValue(information.years);
    this.mascota.controls['months'].setValue(information.months);
    this.mascota.controls['days'].setValue(information.days);
  }

  /**
   * Method the age in years, month and days units
   * @returns Object that contains age information in the attributes 'years', 'months', 'days'
   */
  getInformationAge() {
    let today = moment(new Date());
    let birthdate = moment(this.petToEdit.fechaNacimiento);
    console.log(birthdate);
    var days = this.diffDays(new Date(), this.petToEdit.fechaNacimiento);

    var years = today.diff(birthdate, 'years');
    today.add(-years, 'years');
    var months = today.diff(birthdate, 'months');
    today.add(-months, 'months');

    return { years: years, months: months, days: days };
  }

  /**
   * Method that provides the days between to dates
   * @param date1 Date one
   * @param date2 Date two
   * @returns days difference of the two dates 
   */

  diffDays(date1, date2) {
    const day1 = date1.getDate();
    const day2 = date2.getDate();
    if (day1 >= day2) {
      return day1 - day2;
    }
    const prevMonth = moment(date1).subtract(1, 'month').toDate();
    const daysInPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();
    return daysInPrevMonth - day2 + day1; 
  }
}
