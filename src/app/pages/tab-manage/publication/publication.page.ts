import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TipoPublicacion } from 'src/app/model/enums.model';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PublicationObserverService } from 'src/app/observables/publication-observer.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

/**
 * Class in charge of showing all the publications.
 * Note: This class will show both type of publications depending
 * on the active route, so when the user is in the News route, all the news will
 * be shown, the same with the other publications types
 * @category Components
 */
@Component({
  selector: 'app-news',
  templateUrl: './publication.page.html',
  styleUrls: ['./publication.page.scss'],
})
export class PublicationPage implements OnInit {
  publications: Publicacion[] = [];
  publicationTitle: string;
  publicationsType: TipoPublicacion;
  loading: boolean;
  private publicationSubscription: Subscription;
  constructor(
    private router: Router,
    private sistema: SistemaService,
    private publicationObserver: PublicationObserverService
  ) {}

  async ngOnInit() {
    this.setPublicationsType();
    await this.setPublicationData();

    this.publicationSubscription = this.publicationObserver.getObservable().subscribe(() => {
      this.setPublicationData();
    });
  }

  /**
   * Method that consult the publications from the backend, and will
   * set an array of publications, filtering the type of which the page
   * belongs to
   */
  private async setPublicationData() {
    this.loading = true;
    const { adminPublicacion } = this.sistema.admin;
    const publications = await adminPublicacion.verPublicaciones();
    this.publications = publications.filter((publication) => publication.tipo == this.publicationsType);
    this.loading = false;
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

  /**
   * Set the publication title that will be shown on the header of the view
   * depending on the publication type
   */
  private setPublicationTitle() {
    if (this.publicationsType == TipoPublicacion.NOTICIA) {
      this.publicationTitle = 'noticias';
    } else {
      this.publicationTitle = 'eventos';
    }
  }

  /**
   * Method that unsubscribe from the publication observable
   * when the component is destroyed
   */
  ngOnDestroy() {
    this.publicationSubscription.unsubscribe();
  }
}
