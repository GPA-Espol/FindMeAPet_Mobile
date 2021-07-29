import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TipoPublicacion } from 'src/app/model/enums.model';
import { Publicacion } from 'src/app/model/publicacion.model';

@Component({
  selector: 'app-news',
  templateUrl: './publication.page.html',
  styleUrls: ['./publication.page.scss'],
})
export class PublicationPage implements OnInit {
  publications: Publicacion[] = [];
  publicationTitle: string;
  private publicationsType: TipoPublicacion;

  constructor(private router: Router) {}

  ngOnInit() {
    this.setPublicationsType();
    this.getPublicationData();
  }

  private getPublicationData() {
    const publications = this.buildFakeNews();
    this.publications = publications.filter((publication) => publication.tipo == this.publicationsType);
  }

  private buildFakeNews() {
    let publications: Publicacion[] = [];
    const noticia1 = new Publicacion();
    noticia1.imagen =
      'https://images.freeimages.com/images/premium/previews/4992/49923492-portrait-of-puppy.jpg';
    noticia1.descripcion = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam necessitatibus et totam sunt. Nemo
    porro eveniet sapiente, illo repellendus veritatis minima cumque, corporis sequi, ab dolorum at eius
    quasi fugit.`;
    noticia1.titulo = '¡Balto ya está en casa!';
    noticia1.fecha = new Date();
    noticia1.tipo = TipoPublicacion.EVENTO;
    publications.push(noticia1);
    return publications;
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
}
