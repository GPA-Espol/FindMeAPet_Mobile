import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';
import { TipoPublicacion } from 'src/app/model/enums.model';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PublicationObserverService } from 'src/app/observables/publication-observer.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.page.html',
  styleUrls: ['./add-publication.page.scss'],
})
export class AddPublicationPage implements OnInit {
  publicationForm: FormGroup;
  photoUrl: string;
  publicationsType: TipoPublicacion;
  actionType: string;
  pubToEdit: Publicacion;
  loading = true;
  @ViewChild('imgPicker') imgPicker: ImagePickerComponent;
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private router: Router,
    private sistema: SistemaService,
    private alert: AlertaService,
    private publicationObserver: PublicationObserverService
  ) {}

  async ngOnInit() {
    await this.setPublicationsInfo();
    this.buildForm();
    this.loading = false;
  }

  private buildForm() {
    if (this.actionType == 'Agregar') {
      this.publicationForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
    } else {
      this.publicationForm = this.formBuilder.group({
        title: [this.pubToEdit.titulo, Validators.required],
        description: [this.pubToEdit.descripcion, Validators.required],
      });
    }
  }

  async submitPublication() {
    try {
      if (this.actionType == 'Agregar') {
        await this.saveNewPublication();
      } else {
        await this.updatePublication();
      }
    } catch (err) {
      await this.alert.dismissLoading();
      console.error(err);
      this.alert.presentToast(`Ha ocurrido un error al guardar ${this.publicationsType.toLowerCase()}.`);
    }
  }

  private async saveNewPublication() {
    await this.alert.presentLoading('Guardando...');
    const admin = this.sistema.admin;
    const { adminPublicacion } = admin;
    const publication = new Publicacion();
    publication.titulo = this.publicationForm.get('title').value;
    publication.descripcion = this.publicationForm.get('description').value;
    publication.fecha = new Date();
    publication.idUsuario = admin.id;
    publication.tipo = this.publicationsType;
    publication.imagen = await this.imgPicker.upload();
    await adminPublicacion.crearPublicacion(publication);
    this.publicationObserver.publish();
    const successMessage = this.getSuccessMessage();
    this.alert.presentToast(successMessage);
    this.alert.dismissLoading();
    this.goback();
  }

  private async updatePublication() {
    await this.alert.presentLoading('Guardando...');
    const { adminPublicacion } = this.sistema.admin;
    this.pubToEdit.titulo = this.publicationForm.get('title').value;
    this.pubToEdit.descripcion = this.publicationForm.get('description').value;
    await adminPublicacion.actualizarPublicacion(this.pubToEdit);
    const successMessage = this.getSuccessMessage();
    this.alert.presentToast(successMessage);
    this.alert.dismissLoading();
    this.goback();
  }

  private async setPublicationsInfo() {
    const currentUrl = this.router.url;
    const currentUrlList = currentUrl.split('/');
    const urlLength = currentUrlList.length;
    const lastSegment = currentUrlList[urlLength - 1];
    let actionType = lastSegment;
    let publicationType: string;
    if (lastSegment == 'agregar') {
      publicationType = currentUrlList[urlLength - 2];
    } else {
      const pubId = +currentUrlList[urlLength - 1];
      await this.setPubToEdit(pubId);
      actionType = currentUrlList[urlLength - 2];
      publicationType = currentUrlList[urlLength - 3];
    }
    this.actionType = Utils.capitalize(actionType);
    this.publicationsType = <TipoPublicacion>publicationType;
  }

  private async setPubToEdit(pubId: number) {
    const { adminPublicacion } = this.sistema.admin;
    const publications = await adminPublicacion.verPublicaciones();
    this.pubToEdit = publications.find((pub) => pub.id == pubId);
  }

  /**
   * Method that navigate to the home page with a go back animation
   */
  goback() {
    this.navCtrl.pop();
  }

  private getSuccessMessage() {
    if (this.publicationsType == TipoPublicacion.EVENTO) {
      return 'Se ha guardado el evento correctamente.';
    }
    return 'Se ha guardado la noticia correctamente';
  }
}
