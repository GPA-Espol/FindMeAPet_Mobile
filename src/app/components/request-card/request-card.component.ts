import { Component, Input, OnInit } from '@angular/core';
import { BooleanValueAccessor } from '@ionic/angular';
import { AdministrarUsuario } from 'src/app/model/admin/usuario_admin.model';

import { Mascota } from 'src/app/model/mascota.model';
import { Voluntario } from 'src/app/model/voluntario.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { Mode } from 'src/app/utils/utils';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent implements OnInit {
  loading: boolean;
  mode: String;
  user: Voluntario = new Voluntario();
  pet: Mascota;
  @Input() propuesta: any;
  administrador: AdministrarUsuario;
  constructor(private sistema: SistemaService) {}

  async ngOnInit() {
    this.loading = true;
    this.administrador = this.sistema.admin.adminUsuario;
    await this.setMode();
    await this.getUser();
    this.loading = false;
  }

  async setMode() {
    this.mode = this.propuesta.mascota ? Mode.EDITAR : Mode.ANADIR;
    if (this.mode == Mode.EDITAR) {
      this.pet = this.propuesta.mascota;
    } else {
      this.pet = Mascota.deserializeOne(this.propuesta);
    }
  }

  async getUser() {
    this.user = <Voluntario>(
      await this.administrador.obtenerUsuarioPorId(this.propuesta.id_usuario_voluntario)
    );
    console.log(this.user);
  }

  setNombreyApellido(nombres: String, apellidos: String) {
    let nombre = nombres.split(' ')[0];
    let apellido = apellidos.split(' ')[0];
    return nombre + ' ' + apellido;
  }
}
