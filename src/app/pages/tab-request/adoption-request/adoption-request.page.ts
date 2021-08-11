import { Component, OnInit } from '@angular/core';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-adoption-request',
  templateUrl: './adoption-request.page.html',
  styleUrls: ['./adoption-request.page.scss'],
})
export class AdoptionRequestPage implements OnInit {
  loading = true;

  requests: any[] = [
    {
      nombre: 'Eunice',
      apellido: 'Gálvez',
      ciudad: 'Guayaquil',
      fecha_nacimiento: '1998-08-16',
      correo_electronico: 'eagalvez@espol.edu.ec',
      id_mascota: 1,
    },
    {
      nombre: 'Juan',
      apellido: 'Pérez',
      ciudad: 'Guayaquil',
      fecha_nacimiento: '1970-06-15',
      correo_electronico: 'juan@espol.edu.ec',
      id_mascota: 2,
    },
    {
      nombre: 'María',
      apellido: 'Gómez',
      ciudad: 'Guayaquil',
      fecha_nacimiento: '2000-02-28',
      correo_electronico: 'maria@espol.edu.ec',
      id_mascota: 3,
    },
  ];

  constructor(private sistema: SistemaService) {}

  async ngOnInit() {
    await this.prepareRequestInfo();
    this.loading = false;
  }

  /**
   * Method to prepare the request info, parsing data from the API REST
   * to the data that will be used in the view
   */
  private async prepareRequestInfo() {
    await Promise.all(
      this.requests.map(async (request) => {
        const pet = await this.sistema.getMascotabyId(request.id_mascota);
        request.petName = pet.nombre;
        request.petType = pet.tipoAnimal;
        request.fecha_nacimiento = new Date(request.fecha_nacimiento);
      })
    );
  }
}
