import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  constructor(
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private storage: AngularFireStorage,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}
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
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }
  takePicture(source) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: source,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        this.image64 = 'data:image/jpeg;base64,' + imageData;
      },
      (err) => {
        // Handle error
        console.error(err);
      }
    );
  }
  upload(): void {
    var currentDate = Date.now();
    const file: any = this.base64ToImage(this.image64);
    const filePath = `Images/${currentDate}`;
    const fileRef = this.storage.ref(filePath);

    const task = this.storage.upload(`Images/${currentDate}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((downloadURL) => {
            if (downloadURL) {
              this.showSuccesfulUploadAlert();
            }
            console.log(downloadURL);
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
        }
      });
  }

  async showSuccesfulUploadAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'basic-alert',
      header: 'Finalizado',
      subHeader: 'Imagen subida con éxito en la carpeta Images',
      message: 'Revisa el storage de Firebase.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  base64ToImage(dataURI) {
    const fileDate = dataURI.split(',');
    // const mime = fileDate[0].match(/:(.*?);/)[1];
    const byteString = atob(fileDate[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
  }
}
