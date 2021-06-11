import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Administrador } from '../model/admin/administrador.model';
import { RolUsuario } from '../model/enums.model';
import { UsuarioGPA } from '../model/usuario_gpa.model';
import { Voluntario } from '../model/voluntario.model';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class SistemaService {
  private _usuario: UsuarioGPA;

  constructor(private http: HttpClient, private store: StorageService) {
    console.log('creandose');
  }

  public async login(usuario: string, password: string) {
    let loginUrl = environment.api + 'auth';
    let { token, rol } = /*await this.http
      .post<any>(loginUrl, { usuario, password })
      .toPromise();*/ { token: 'a', rol: 'Admin' };
    await this.store.set('user', { token, rol });
    if (rol == RolUsuario.ADMIN) {
      this._usuario = new Administrador(this.http);
    } else {
      this._usuario = new Voluntario(this.http);
    }
    return rol;
  }
}
