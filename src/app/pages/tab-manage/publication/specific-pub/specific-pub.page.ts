import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PublicationObserverService } from 'src/app/observables/publication-observer.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

/**
 * Class in charge of showing a specific publication.
 * @category Components
 */
@Component({
  selector: 'app-specific-pub',
  templateUrl: './specific-pub.page.html',
  styleUrls: ['./specific-pub.page.scss'],
})
export class SpecificPubPage implements OnInit {
  loading = true;
  publication: Publicacion;
  constructor(
    private route: ActivatedRoute,
    private sistema: SistemaService,
    private alert: AlertaService,
    private publicationObserver: PublicationObserverService,
    private nav: NavController
  ) {}

  async ngOnInit() {
    await this.setPublicationInfo();
    this.loading = false;
  }

  /**
   * Will bring all the information of a publications with an id that will be
   * obtained from the params of the active route.
   */
  private async setPublicationInfo() {
    let idPublication = +this.route.snapshot.paramMap.get('id');
    const { adminPublicacion } = this.sistema.admin;
    this.publication = await adminPublicacion.verPublicacion(idPublication);
  }

  /**
   * Will show a modal for the user to confirm that indeed he/she wants to 
   * delete the current publication
   */
  async modalDelete() {
    const message = '¿Estás seguro que deseas eliminar esta publicación?';
    await this.alert.confirmationAlert(message, this.deletePublication.bind(this));
  }

  /**
   * Delete the current publication from the system and shows a feedback to user
   * when the deletion completes
   */
  private async deletePublication() {
    try {
      await this.alert.presentLoading('Eliminando...');
      const { adminPublicacion } = this.sistema.admin;
      await adminPublicacion.eliminarPublicacion(this.publication.id);
      this.publicationObserver.publish();
      this.alert.presentToast('Se ha eliminado correctamente.');
      this.nav.pop();
    } catch (err) {
      console.error('Error while deleting the publication', err);
      this.alert.presentToast('Ha ocurrido un error al eliminar.');
    }
    this.alert.dismissLoading();
  }
}
