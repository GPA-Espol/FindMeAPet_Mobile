import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TipoPublicacion } from 'src/app/model/enums.model';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PublicationObserverService } from 'src/app/observables/publication-observer.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-news',
  templateUrl: './publication.page.html',
  styleUrls: ['./publication.page.scss'],
})
export class PublicationPage implements OnInit {
  publications: Publicacion[] = [];
  publicationTitle: string;
  publicationsType: TipoPublicacion;

  private publicationSubscription: Subscription;
  constructor(
    private router: Router,
    private sistema: SistemaService,
    private publicationObserver: PublicationObserverService
  ) {}

  ngOnInit() {
    this.setPublicationsType();
    this.getPublicationData();
    this.publicationSubscription = this.publicationObserver.getObservable().subscribe(() => {
      this.getPublicationData();
    });
  }

  private async getPublicationData() {
    const { adminPublicacion } = this.sistema.admin;
    this.publications = await adminPublicacion.verPublicaciones();
  }

  /**
   * Method that set this.publicationType from the currentUrl
   * and set an adecuate title to be shown in header
   */
  private setPublicationsType() {
    const currentUrl = this.router.url;
    const currentUrlList = currentUrl.split('/');
    const publicationType = currentUrlList[currentUrlList.length - 1];
    this.publicationsType = <TipoPublicacion>publicationType;
    this.setPublicationTitle();
  }

  private setPublicationTitle() {
    if (this.publicationsType == TipoPublicacion.NOTICIA) {
      this.publicationTitle = 'noticias';
    } else {
      this.publicationTitle = 'eventos';
    }
  }

  ngOnDestroy() {
    this.publicationSubscription.unsubscribe();
  }
}
