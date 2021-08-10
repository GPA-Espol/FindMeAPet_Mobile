import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adoption-request',
  templateUrl: './adoption-request.page.html',
  styleUrls: ['./adoption-request.page.scss'],
})
export class AdoptionRequestPage implements OnInit {
  requests = [
    {
      nombre: 'Eunice',
      apellido: 'Gálvez',
      ciudad: 'Guayaquil',
      fecha_nacimiento: new Date('16/08/1998'),
    },
    {},
  ];

  constructor() {}

  ngOnInit() {}
}
