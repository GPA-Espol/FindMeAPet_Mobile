import { Component, OnInit } from '@angular/core';
import { UbicacionMascota } from 'src/app/model/enums.model';
import { Mascota } from 'src/app/model/mascota.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-tab-pets',
  templateUrl: './tab-pets.page.html',
  styleUrls: ['./tab-pets.page.scss'],
})
export class TabPetsPage implements OnInit {
  pets: Mascota[] = [];
  textoBuscar: '';
  lugarBuscar = 'todos';
  loading = true;

  constructor(private sistema: SistemaService) {}

  async ngOnInit() {
    this.loading = true;
    this.pets = await this.sistema.getMascotas();
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  buscar(event) {
    this.textoBuscar = event.target.value;
  }

  filterLocation(lugar) {
    this.lugarBuscar = lugar;
  }
}
