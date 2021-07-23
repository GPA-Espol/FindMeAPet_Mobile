import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/model/mascota.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

/**
 * Class in charge of the behaviour of tab pets page
 * @category Components
 */
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
    this.loading = false;
  }
  /**
   * Method that sets the value of the name by which pets will be filtered (by name)
   * @param event Event that gets the value from the search bar
   */
  buscar(event) {
    this.textoBuscar = event.target.value;
  }

  /**
   * Method that sets the value of the place by which pets will be filtered
   * @param lugar value of the filter
   */
  filterLocation(lugar) {
    this.lugarBuscar = lugar;
  }

  /**
   * Method to refresh the list of pets currently in the page forcing
   * an http request to obtain the data
   * @param event Event object that triggers the refresh
   */
  async refreshPets(event: any) {
    this.pets = await this.sistema.getMascotas(true);
    event.target.complete();
  }
}
