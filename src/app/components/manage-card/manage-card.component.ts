import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PublicationObserverService } from 'src/app/observables/publication-observer.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-manage-card',
  templateUrl: './manage-card.component.html',
  styleUrls: ['./manage-card.component.scss'],
})
export class ManageCardComponent implements OnInit {
  DISPLAY_TEXT_MAX_LENGTH = 200;
  display_description: string;
  @Input() publicacion: Publicacion;
  private publicationSubscription: Subscription;
  constructor(
    private alertController: AlertController,
    private sistema: SistemaService,
    private alert: AlertaService,
    private publicationObserver: PublicationObserverService
  ) {}

  ngOnInit() {
    this.truncateText();
    this.publicationSubscription = this.publicationObserver.getObservable().subscribe(() => {
      this.truncateText();
    });
  }

  private truncateText() {
    const description = this.publicacion.descripcion;
    if (description.length > this.DISPLAY_TEXT_MAX_LENGTH) {
      this.display_description = description.substr(0, this.DISPLAY_TEXT_MAX_LENGTH) + '...';
    } else {
      this.display_description = description;
    }
  }

  async delete() {
    const alert = await this.alertController.create({
      header: '¡Espera!',
      message: '¿Estás seguro que deseas eliminar esta publicación?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: async () => {
            await this.deletePublication();
          },
        },
      ],
    });
    await alert.present();
  }

  private async deletePublication() {
    try {
      await this.alert.presentLoading('Eliminando...');
      const { adminPublicacion } = this.sistema.admin;
      await adminPublicacion.eliminarPublicacion(this.publicacion.id);
      this.publicationObserver.publish();
    } catch (err) {
      console.error('Error while delete publication', err);
      this.alert.presentToast('Ha ocurrido un error al eliminar.');
    }
    this.alert.dismissLoading();
  }

  ngOnDestroy() {
    this.publicationSubscription.unsubscribe();
  }
}
