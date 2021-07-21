import { Component, OnInit } from '@angular/core';
import { Publicacion } from 'src/app/model/publicacion.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  noticias: Publicacion[] = [];

  constructor() {}

  ngOnInit() {
    this.buildFakeNews();
  }

  private buildFakeNews() {
    const noticia1 = new Publicacion();
    noticia1.imagen =
      'https://images.freeimages.com/images/premium/previews/4992/49923492-portrait-of-puppy.jpg';
    noticia1.descripcion = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam necessitatibus et totam sunt. Nemo
    porro eveniet sapiente, illo repellendus veritatis minima cumque, corporis sequi, ab dolorum at eius
    quasi fugit.`;
    noticia1.titulo = '¡Balto ya está en casa!';
    noticia1.fecha = new Date();
    this.noticias.push(noticia1);
  }
}
