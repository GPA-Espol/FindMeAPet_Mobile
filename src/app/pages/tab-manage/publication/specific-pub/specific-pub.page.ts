import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PublicationObserverService } from 'src/app/observables/publication-observer.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

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

  private async setPublicationInfo() {
    let idPublication: number;
    this.route.paramMap.subscribe((paramMap) => {
      idPublication = +paramMap.get('id');
    });
    const { adminPublicacion } = this.sistema.admin;
    this.publication = await adminPublicacion.verPublicacion(idPublication);
  }

  async modalDelete() {
    const message = '¿Estás seguro que deseas eliminar esta publicación?';
    await this.alert.confirmationAlert(message, this.deletePublication.bind(this));
  }

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
