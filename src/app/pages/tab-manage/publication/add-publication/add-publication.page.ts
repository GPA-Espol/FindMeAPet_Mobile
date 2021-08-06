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
import { Mode, Utils } from 'src/app/utils/utils';

/**
 * Class in charge of the adition and updating of a given publication 
 * of a given type that depends on the active route
 * @category Components
 */
@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.page.html',
  styleUrls: ['./add-publication.page.scss'],
})
export class AddPublicationPage implements OnInit {
  publicationForm: FormGroup;
  photoUrl: string;
  publicationsType: TipoPublicacion;
  mode: Mode;
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

  /**
   * Build the FormGroup of the publication, if adding a new publication
   * the form properties will be initialized empty, but if updating a 
   * publication the form properties will be initialized with the last
   * publication info.
   * The form will have the following fields:
   *   - title: the title of the publication
   *   - description: the body of the publication
   * The image is not defined here since the way it is saved is different
   */
  private buildForm() {
    if (this.mode == Mode.ANADIR) {
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

  /**
   * Method that handle the submit event of the publication, and 
   * handle errors
   */
  async submitPublication() {
    try {
      if (this.mode == Mode.ANADIR) {
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

  /**
   * Gather the information from the form group and the url of the
   * image to build a new publication that will be saved on the system.
   */
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
    publication.imagenUrl = await this.imgPicker.upload();
    await adminPublicacion.crearPublicacion(publication);
    this.publicationObserver.publish();
    const successMessage = this.getSuccessMessage();
    this.alert.presentToast(successMessage);
    this.alert.dismissLoading();
    this.goback();
  }

  /**
   * Gather the information from the form group and the url of the
   * image to update a publication of the system.
   */
  private async updatePublication() {
    await this.alert.presentLoading('Guardando...');
    const { adminPublicacion } = this.sistema.admin;
    this.pubToEdit.titulo = this.publicationForm.get('title').value;
    this.pubToEdit.descripcion = this.publicationForm.get('description').value;
    await adminPublicacion.actualizarPublicacion(this.pubToEdit);
    this.publicationObserver.publish();
    const successMessage = this.getSuccessMessage();
    this.alert.presentToast(successMessage);
    this.alert.dismissLoading();
    this.goback();
  }

  /**
   * Set the publication info such as if the view will add or update
   * a publication, and the publication type. Getting all this from
   * the active route.
   */
  private async setPublicationsInfo() {
    const currentUrl = this.router.url;
    const currentUrlList = currentUrl.split('/');
    const urlLength = currentUrlList.length;
    const lastSegment = currentUrlList[urlLength - 1];
    let actionType = lastSegment;
    let publicationType: any;
    if (lastSegment == Mode.ANADIR) {
      publicationType = currentUrlList[urlLength - 2];
    } else {
      const pubId = +currentUrlList[urlLength - 1];
      await this.setPubToEdit(pubId);
      actionType = currentUrlList[urlLength - 2];
      publicationType = currentUrlList[urlLength - 3];
    }
    this.mode = <Mode>actionType;
    this.publicationsType = <TipoPublicacion>publicationType;
  }

  /**
   * If the page will edit a publication, this method get the current state
   * of that publication given its id
   * @param {number} pubId Publication id
   */
  private async setPubToEdit(pubId: number) {
    const { adminPublicacion } = this.sistema.admin;
    const publications = await adminPublicacion.verPublicaciones();
    this.pubToEdit = publications.find((pub) => pub.id == pubId);
  }

  /**
   * Method that navigate to the publication page with a go back animation
   */
  goback() {
    this.navCtrl.pop();
  }

  /**
   * Method that builds an appropiate success message depending on
   * the publication type
   * @returns {string} The success message
   */
  private getSuccessMessage() {
    if (this.publicationsType == TipoPublicacion.EVENTO) {
      return 'Se ha guardado el evento correctamente.';
    }
    return 'Se ha guardado la noticia correctamente';
  }
}
