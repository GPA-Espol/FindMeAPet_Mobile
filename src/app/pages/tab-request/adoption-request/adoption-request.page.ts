import { Component, OnInit } from '@angular/core';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-adoption-request',
  templateUrl: './adoption-request.page.html',
  styleUrls: ['./adoption-request.page.scss'],
})
export class AdoptionRequestPage implements OnInit {
  loading = true;

  requests: any[];

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
    const { adminFormulario } = this.sistema.admin;
    const requests = await adminFormulario.revisarFormularios();
    await Promise.all(
      requests.map(async (request: any) => {
        const pet = await this.sistema.getMascotabyId(request.id_mascota);
        request.petName = pet.nombre;
        request.petType = pet.tipoAnimal;
        request.fecha_nacimiento = new Date(request.fecha_nacimiento);
      })
    );
    this.requests = requests;
  }
}
