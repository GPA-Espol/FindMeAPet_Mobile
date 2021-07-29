import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';
import { TipoPublicacion } from 'src/app/model/enums.model';
import { Publicacion } from 'src/app/model/publicacion.model';
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
  @ViewChild('imgPicker') imgPicker: ImagePickerComponent;
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private router: Router,
    private sistema: SistemaService,
    private alert: AlertaService
  ) {}

  ngOnInit() {
    this.setPublicationsInfo();
    this.buildForm();
  }

  private buildForm() {
    this.publicationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  async submitPublication() {
    try {
      await this.savePublication();
    } catch (err) {
      await this.alert.dismissLoading();
      console.error(err);
      this.alert.presentToast(`Ha ocurrido un error al guardar ${this.publicationsType.toLowerCase()}.`);
    }
  }

  private async savePublication() {
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
    const successMessage = this.getSuccessMessage();
    this.alert.presentToast(successMessage);
    this.alert.dismissLoading();
    this.goback();
  }

  private setPublicationsInfo() {
    const currentUrl = this.router.url;
    const currentUrlList = currentUrl.split('/');
    const publicationType = currentUrlList[currentUrlList.length - 2];
    const actionType = currentUrlList[currentUrlList.length - 1];
    this.actionType = Utils.capitalize(actionType);
    this.publicationsType = <TipoPublicacion>publicationType;
  }

  /**
   * Method that navigate to the home page with a go back animation
   */
  goback() {
    this.navCtrl.navigateBack(`/tabs/admin/configuracion/${this.publicationsType}`);
  }

  private getSuccessMessage() {
    if (this.publicationsType == TipoPublicacion.EVENTO) {
      return 'Se ha guardado el evento correctamente.';
    }
    return 'Se ha guardado la noticia correctamente';
  }
}
