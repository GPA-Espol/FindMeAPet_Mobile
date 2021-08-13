import { Component, Input, OnInit } from '@angular/core';

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
  mode: String;
  user: Voluntario;
  pet: Mascota;
  @Input() propuesta: any;
  constructor(private sistema: SistemaService) {}

  ngOnInit() {
    this.setMode();
  }

  async setMode() {
    this.mode = this.propuesta.mascota ? Mode.EDITAR : Mode.ANADIR;
    console.log(this.mode);
    if (this.mode == Mode.EDITAR) {
      console.log(this.propuesta.id_mascota);

      this.pet = this.propuesta.mascota;
      console.log(this.pet);
    } else {
      this.pet = Mascota.deserializeOne(this.propuesta);
    }
  }
}