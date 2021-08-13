import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-specific-user',
  templateUrl: './specific-user.page.html',
  styleUrls: ['./specific-user.page.scss'],
})
export class SpecificUserPage implements OnInit {
  user: any;
  isAdmin: boolean;
  loading = true;
  constructor(private route: ActivatedRoute, private sistema: SistemaService) {}

  async ngOnInit() {
    await this.getUserData();
    this.loading = false;
  }

  private async getUserData() {
    const id = +this.route.snapshot.paramMap.get('id');
    const { adminUsuario } = this.sistema.admin;
    this.user = await adminUsuario.obtenerUsuarioPorId(id);
    this.isAdmin = this.user instanceof Administrador;
  }
}
