import { Component, OnInit } from '@angular/core';
import { TipoPublicacion } from 'src/app/model/enums.model';

@Component({
  selector: 'app-tab-manage',
  templateUrl: './tab-manage.page.html',
  styleUrls: ['./tab-manage.page.scss'],
})
export class TabManagePage implements OnInit {
  options = [
    {
      redirectTo: TipoPublicacion.NOTICIA,
      icon: '/assets/icon/newspaper.svg',
      description: 'Administrar Noticias',
    },
    {
      redirectTo: TipoPublicacion.EVENTO,
      icon: '/assets/icon/events.svg',
      description: 'Administrar Eventos',
    },
    {
      redirectTo: 'Usuario',
      icon: '/assets/icon/users.svg',
      description: 'Administrar Usuarios',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
