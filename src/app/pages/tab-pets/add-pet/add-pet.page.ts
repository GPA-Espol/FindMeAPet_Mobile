import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, NavController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController } from '@ionic/angular';
import { map, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mascota } from 'src/app/model/mascota.model';
import * as moment from 'moment';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute, Router } from '@angular/router';

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
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  setMode() {
    let route = this.router.url;
    let array = route.split('/');
    this.mode = array[array.length - 2];
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
  }

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
    await this.administrador.adminMascota.actualizarMascota(this.idPet, this.petToEdit);
    this.alertaService.presentToast('La mascota ha sido editada');
    this.goback();
  }

  /**
   * Handler that pushes the new pet to the api and adds it to
   * the system pets array.
   */
  async createPet() {
    let newPet = new Mascota();
    this.setValues(newPet);
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
    const blob = new Blob([arrayBuffer], { type: 'image/png' });
    return blob;
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
}
