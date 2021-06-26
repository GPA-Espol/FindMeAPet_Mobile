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
    private alertCtrl: AlertController,
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
      this.alertaService.presentToast('La mascota ha sido agregada');
      this.goback();
    } catch (err) {
      console.error('Error al crear mascota: ', err);
      this.alertaService.presentToast('Error al guardar mascota, por favor intente de nuevo' + err);
    }
    this.alertaService.dismissLoading();
  }

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

  goback() {
    this.navCtrl.navigateBack('/tabs/admin/mascotas');
  }

  getBirthDate() {
    let today = moment(new Date());
    today.subtract(this.mascota.get('years').value, 'years');
    today.subtract(this.mascota.get('months').value, 'months');
    today.subtract(this.mascota.get('days').value, 'days');
    return today.toDate();
  }
}
