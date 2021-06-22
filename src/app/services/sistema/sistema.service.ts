import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Administrador } from '../../model/admin/administrador.model';
import { RolUsuario } from '../../model/enums.model';
import { Mascota } from '../../model/mascota.model';
import { UsuarioGPA } from '../../model/usuario_gpa.model';
import { Voluntario } from '../../model/voluntario.model';
import { Utils } from '../../utils/utils';
import { StorageService } from '../storage/storage.service';
@Injectable({
  providedIn: 'root',
})
export class SistemaService {
  private _usuario: UsuarioGPA;
  private _mascotas: { data: Mascota[]; time: number };

  constructor(private http: HttpClient, private store: StorageService, private utils: Utils) {}

  public async login(usuario: string, password: string) {
    let loginUrl = environment.api + 'auth';
    //let { token, rol } = await this.http.post<any>(loginUrl, { usuario, password }).toPromise();
    let token = 'aa';
    let rol = RolUsuario.ADMIN;
    await this.store.set('usuario', { token, rol });
    if (rol == RolUsuario.ADMIN) {
      this._usuario = new Administrador(this.http);
    } else {
      this._usuario = new Voluntario(this.http);
    }
  }

  public async logout() {
    this._usuario = undefined;
    await this.store.remove('usuario');
  }

  public userLoggedIn() {
    return this.store.get('usuario');
  }

  public async getMascotas(forceReload = false) {
    let url = environment.api + 'mascota';
    if (forceReload || !this._mascotas || this.utils.cacheExpired(this._mascotas.time)) {
      let data = await this.http.get<any[]>(url).toPromise();
      let now = new Date().getTime();
      this._mascotas = { data: Mascota.deserialize(data), time: now };
    }
    return this._mascotas.data;
  }

  public async createMacota(mascota:any) {
    let url = environment.api + 'mascota';
    let response_code = await this.http.post<any[]>(url, mascota ).toPromise();
    return response_code;
  }

  public get voluntario() {
    return this._usuario as Voluntario;
  }

  public get admin() {
    return this._usuario as Administrador;
  }
}
