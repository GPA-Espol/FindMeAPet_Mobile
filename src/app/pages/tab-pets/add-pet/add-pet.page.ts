import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from 'src/app/model/mascota.model';
import * as moment from 'moment';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';
import { PetObserverService } from 'src/app/observables/pet-observer.service';
import { Voluntario } from 'src/app/model/voluntario.model';
import {  ColorMascota, RolUsuario, UbicacionMascota } from 'src/app/model/enums.model';
import { Mode, Utils } from 'src/app/utils/utils';

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
  mode: string = '';
  ubicaciones: UbicacionMascota[];
  idPet: number;
  oldPet : any = {};
  petToEdit: Mascota ;
  extraInformation: boolean = false;
  ageType: string = '';
  mascota: FormGroup;
  administrador: Administrador;
  voluntario: Voluntario;
  colors = ColorMascota;
  colorsKeys=[]
  ubicacionesKeys = []

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

  ngOnInit() {
    this.buildPetForm();
    this.setMode();
    this.createUser();
    this.colorsKeys = Object.keys(ColorMascota);
    this.ubicaciones = Object.values(UbicacionMascota);
  }

  /**
   * Method that build the form for the pet based on the model
   */
  buildPetForm() {
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
  }

  /**
   * Method that sets the page mode to edit o to anadir. The page funcionality is based on this mode.
   */
  async setMode() {
    let route = this.router.url;
    let array = route.split('/');
    let end = array[array.length - 1];
    this.mode = end == 'anadir' ? Mode.ANADIR : Mode.EDITAR;
    if (this.mode == Mode.EDITAR) {
      await this.getData();  
      Object.assign(this.oldPet, Mascota.serialize(this.petToEdit));
    }
  }

  /**
   * Method that create the user (admin or voluntario) to perform specific functions in the page
   */
  async createUser() {
    let userLogged = await this.sistema.userLoggedIn();
    if (userLogged.rol == RolUsuario.VOLUNTARIO) {
      this.voluntario = this.sistema.voluntario;
    } else {
      this.administrador = this.sistema.admin;
    }
  }

  /**
   * Method that set values to the form fields of the pet to edit
   */
  async getData() {
    this.idPet = +this.route.snapshot.paramMap.get('id');
    let petSistema= await this.sistema.getMascotabyId(this.idPet);
    this.petToEdit =  new Mascota();
    Object.assign(this.petToEdit, petSistema)
    //this.petToEdit = <any> {...petSistema};
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
   *  Handler that pushes the pet to the REST-API for it to update it
   */
  async editPet() {
    const loaddingMessage = this.administrador
      ? 'Actualizando mascota'
      : 'Enviando solicitud de actualización';
    const succesMessage = this.administrador ? 'La mascota ha sido editada' : 'La solicitud ha sido enviada';
    const errorMessage = this.administrador ? 'Error al editar mascota' : 'Error al enviar solicitud';
    this.setValues(this.petToEdit);
    await this.alertaService.presentLoading(loaddingMessage);
    try {
      this.petToEdit.imagenUrl = await this.imgPicker.upload();
      if (this.administrador) {
        this.petObserver.publish(this.petToEdit); 
        await this.administrador.adminMascota.actualizarMascota(this.idPet, this.petToEdit);
      } else {
        await this.voluntario.hacerSolicitudActualizacionMascota(this.oldPet, this.petToEdit,this.idPet );
      }
      this.goback();
      await this.alertaService.presentToast(succesMessage);
    } catch (err) {
      this.alertaService.presentToast(errorMessage + ', por favor intente de nuevo' + err);
    }
    this.alertaService.dismissLoading();
  }

  async onSubmit() {
    if (this.voluntario) {
      await this.modalVoluntarioConfirmation();
    } else {
      if (this.mode == Mode.EDITAR) {
        this.editPet();
      } else {
        this.createPet();
      }
    }
  }

  /**
   * Handler that pushes the new pet to the REST-API and adds it to
   * the system pets array.
   */
  async createPet() {
    const loaddingMessage = this.administrador ? 'Creando mascota' : 'Enviando solicitud de creación';
    const succesMessage = this.administrador ? 'La mascota ha sido agregada' : 'La solicitud ha sido enviada';
    const errorMessage = this.administrador ? 'Error al agregar mascota' : 'Error al enviar solicitud';
    let newPet = new Mascota();
    this.setValues(newPet);
    if (!this.imgPicker.image64 && newPet.isAdoptable) {
      return await this.alertaService.presentToast('Por favor añada la imagen de la mascota');
    }
    await this.alertaService.presentLoading(loaddingMessage);
    try {
      newPet.imagenUrl = await this.imgPicker.upload();
      if (this.administrador) {
        await this.administrador.adminMascota.crearMascota(newPet);
      } else {
        await this.voluntario.hacerSolicitudCreacionMascota(newPet);
      }
      this.goback();
      await this.alertaService.presentToast(succesMessage);
    } catch (err) {
      this.alertaService.presentToast(errorMessage + ', por favor intente de nuevo' + err);
      console.log(err);
      
    }
    this.alertaService.dismissLoading();
    //console.log('NEW PET', newPet );
    
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
    const now = new Date();
    now.setUTCHours(0, 0, 0);
    let birthDate = moment(now);
    birthDate.subtract(this.mascota.get('years').value, 'years');
    birthDate.subtract(this.mascota.get('months').value, 'months');
    birthDate.subtract(this.mascota.get('days').value, 'days');
    return birthDate.toDate();
  }

  /**
   * Method that set the age information in the form fields
   */
  setAgeInformation() {
    let information = Utils.getInformationAge(this.petToEdit.fechaNacimiento);
    this.mascota.controls['years'].setValue(information.years);
    this.mascota.controls['months'].setValue(information.months);
    this.mascota.controls['days'].setValue(information.days);
  }

  async modalVoluntarioConfirmation() {
    if (this.mode == Mode.EDITAR) {
      const messageEdit = 'Se notificará al administrador para que acepte su solicitud de editar mascota';
      await this.alertaService.confirmationAlert(messageEdit, this.editPet.bind(this));
    } else {
      const messageAdd = 'Se notificará al administrador para que acepte su solicitud de agregar mascota';
      await this.alertaService.confirmationAlert(messageAdd, this.createPet.bind(this));
    }
  }
}
