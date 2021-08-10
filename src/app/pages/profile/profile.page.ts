import { Component, OnInit } from '@angular/core';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { RolUsuario } from 'src/app/model/enums.model';
import { UsuarioGPA } from 'src/app/model/usuario_gpa.model';
import { Voluntario } from 'src/app/model/voluntario.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  informationItems = [];
  voluntario: Voluntario;
  administrador: Administrador;
  usuario: UsuarioGPA;
  constructor(private sistema: SistemaService) {}

  ngOnInit() {
    this.setUser();
    
    
  }

  async setUser() {
    let cached_user = await this.sistema.userLoggedIn();
    
    if (cached_user.rol == RolUsuario.VOLUNTARIO) {
      this.setItemsVolunteer();
      this.usuario = await this.sistema.voluntario as UsuarioGPA;
    } else {
      this.setItemsAdmin();
      this.usuario = await this.sistema.admin as UsuarioGPA;
    }
    console.log(this.usuario);
    
  }

  setItemsAdmin() {
    this.informationItems = [
      { title: 'Usuario', info: 'Administrador', icon: '/assets/user-icon.png' },
      { title: 'Desde', info: '20/10/99', icon: '/assets/since.png' },
    ];
  }

  setItemsVolunteer() {
    this.informationItems = [
      { title: 'Usuario', info: 'Voluntario', icon: '/assets/user-icon.png' },
      { title: 'Actividad', info: 'Recorrido', icon: '/assets/activity.png' },
      { title: 'Dias de voluntariado', info: 'Lunes y Miercoles', icon: '/assets/calendar.png' },
      { title: 'Desde', info: '20/10/99', icon: '/assets/since.png' },
    ];
  }
}
