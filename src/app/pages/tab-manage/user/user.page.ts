import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { Voluntario } from 'src/app/model/voluntario.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  admins: Administrador[];
  volunteers: Voluntario[];
  loading = true;

  constructor(private sistema: SistemaService) {}

  async ngOnInit() {
    await this.getData();
    this.loading = false;
    console.log(this.admins);
  }

  private async getData() {
    const { adminUsuario } = this.sistema.admin;
    const usuarios = await adminUsuario.obtenerUsuarios();
    this.admins = usuarios.admins;
    this.volunteers = usuarios.voluntarios;
  }
}
