import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { Voluntario } from 'src/app/model/voluntario.model';
import { UserService } from 'src/app/observables/user.service';
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
  private userSubscription: Subscription;

  constructor(private sistema: SistemaService, private userObserver: UserService) {}

  async ngOnInit() {
    await this.getData();
    this.userSubscription = this.userObserver.getObservable().subscribe(async () => {
      this.loading = true;
      await this.getData();
      this.loading = false;
    });
    this.loading = false;
  }

  private async getData() {
    const { adminUsuario } = this.sistema.admin;
    const usuarios = await adminUsuario.obtenerUsuarios();
    this.admins = usuarios.admins;
    this.volunteers = usuarios.voluntarios;
  }
}
