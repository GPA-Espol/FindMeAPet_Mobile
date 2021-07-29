import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from 'src/app/model/mascota.model';
import * as moment from 'moment';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';

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
  extraInformation: boolean = false;
  ageType: string = '';
  mascota: FormGroup;
  administrador: Administrador;

  @ViewChild('imgPicker') imgPicker: ImagePickerComponent;
  constructor(
    private sistema: SistemaService,
    private alertaService: AlertaService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
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
  }

  /**
   * On submit handler that pushes the new pet to the api and adds it to
   * the system pets array.
   */
  async onSubmit() {
    if (!this.imgPicker.image64) {
      return await this.alertaService.presentToast('Por favor añada la imagen de la mascota');
    }
    let newPet = new Mascota();
    newPet.nombre = this.mascota.get('nombre').value;
    newPet.fechaNacimiento = this.getBirthDate();
    newPet.color = this.mascota.get('color').value;
    newPet.isCasoExterno = this.mascota.get('caso_externo').value;
    newPet.isEsterilizado = this.mascota.get('esterilizado').value;
    newPet.isAdoptado = this.mascota.get('adoptado').value;
    newPet.isAdoptable = this.mascota.get('adoptable').value;
    newPet.sexo = this.mascota.get('sexo').value;
    newPet.ubicacionMascota = this.mascota.get('ubicacion').value;
    newPet.descripcion = this.mascota.get('descripcion').value;
    newPet.tipoAnimal = this.mascota.get('tipo').value;
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
    this.navCtrl.navigateBack('/tabs/admin/mascotas');
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
}
