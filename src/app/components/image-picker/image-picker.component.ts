import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AlertaService } from 'src/app/services/alerta/alerta.service';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  image64: string;
  constructor(
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private alertaService: AlertaService,
    private storage: AngularFireStorage
  ) {}

  ngOnInit() {}

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
  private takePicture(source: PictureSourceType) {
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
   * Method that upload the picture to the firebase storage and set the
   * download link to the attribute image of the pet
   */
  async upload() {
    const currentDate = Date.now();
    const file: any = this.base64ToImage(this.image64);
    const filePath = `Images/${currentDate}`;
    const fileRef = this.storage.ref(filePath);

    let downloadURL: Observable<any>;
    const task = this.storage.upload(`Images/${currentDate}`, file);
    await task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          downloadURL = fileRef.getDownloadURL();
        })
      )
      .toPromise();
    return await downloadURL.toPromise();
  }

  /**
   * Transform the base64 data of the photo into a blob object in an
   * image format.
   */
  private base64ToImage(dataURI: string) {
    const fileDate = dataURI.split(',');
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: 'image/png' });
  }
}
