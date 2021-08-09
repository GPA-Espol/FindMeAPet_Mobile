import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-request',
  templateUrl: './tab-request.page.html',
  styleUrls: ['./tab-request.page.scss'],
})
export class TabRequestPage implements OnInit {
  options = [
    {
      redirectTo: 'adopcion',
      icon: '/assets/icon/adopcion.svg',
      description: 'Adopción',
    },
    {
      redirectTo: 'propuesta-voluntarios',
      icon: '/assets/icon/voluntario.svg',
      description: 'Propuestas de voluntarios',
    },
    {
      redirectTo: 'casos-ext',
      icon: '/assets/icon/mascotas.png',
      description: 'Casos externos',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
