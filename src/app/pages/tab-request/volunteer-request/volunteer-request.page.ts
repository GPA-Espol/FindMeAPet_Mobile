import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-volunteer-request',
  templateUrl: './volunteer-request.page.html',
  styleUrls: ['./volunteer-request.page.scss'],
})
export class VolunteerRequestPage implements OnInit {
  loading: boolean;
  administrador: Administrador;
  propuestas: any[];
  constructor(private sistema: SistemaService) {}

  async ngOnInit() {
    this.loading = true;
    this.administrador = this.sistema.admin;
    await this.getPropuestas();
    this.loading = false;
  }

  async getPropuestas() {
    this.propuestas = await this.administrador.adminMascota.verPropuestasVoluntarios();
    for (const propuesta of this.propuestas) {
      if (propuesta.id_mascota) {
        propuesta.mascota = await this.sistema.getMascotabyId(propuesta.id_mascota);
      }
    }

  }
}
