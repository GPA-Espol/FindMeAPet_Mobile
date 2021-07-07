import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, NavController, AlertController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from 'src/app/model/mascota.model';
import * as moment from 'moment';
import { Administrador } from 'src/app/model/admin/administrador.model';

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
  image64: string;
  downloadURL: Observable<string>;
  mascota: FormGroup;
  administrador: Administrador;
  constructor(
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private storage: AngularFireStorage,
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
      await this.upload();
      newPet.imagenUrl = this.mascota.get('image').value;
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
   * Method that upload the picture to the firebase storage and set the
   * download link to the attribute image of the pet
   */
  async upload() {
    var currentDate = Date.now();
    const file: any = this.base64ToImage(this.image64);
    const filePath = `Images/${currentDate}`;
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(`Images/${currentDate}`, file);
    await task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
        })
      )
      .toPromise();
    let imageURL = await this.downloadURL.toPromise();
    this.mascota.patchValue({ image: imageURL });
  }

  /**
   * Transform the base64 data of the photo into a blob object in an
   * image format.
   */
  base64ToImage(dataURI: string) {
    const fileDate = dataURI.split(',');
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: 'image/png' });
  }

  /**
   * Method that create and show an actionSheetController to the user in order that
   * he/she select wheter he/she wants to take a photo from the camera or upload it
   * from the file system.
   */
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      header: 'Elegir fuente de la imagen',
      buttons: [
        {
          text: 'Elegir de la biblioteca',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: 'Usar Camara',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  /**
   * Method that activate the camara in order to take a picture.
   * This method set the attribute image64 with the base64 value of the
   * picture took.
   */
  takePicture(source) {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: source,
      targetWidth: 1000,
      targetHeight: 1000,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        this.image64 = 'data:image/jpeg;base64,' + imageData;
      },
      (err) => {
        this.alertaService.presentToast('Ha ocurrido un error al tomar la foto.');
        console.error(err);
      }
    );
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
