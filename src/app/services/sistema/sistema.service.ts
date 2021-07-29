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
/**
 * Service Class in charge of retaining most general information about the system
 * like get from the api and save the user object logged in in the app, or the
 * pets consulted.
 * @category Services
 */
@Injectable({
  providedIn: 'root',
})
export class SistemaService {
  private _usuario: UsuarioGPA;
  private _mascotas: { data: Mascota[]; time: number };

  constructor(private http: HttpClient, private store: StorageService, private utils: Utils) {}

  /**
   * Make an http request to log in the user in the system, and save his/her role and save the
   * jsonwebtoken in the localStorage and create the user instance if he/she logs in succesfuly.
   * @throws Error if the user or password are incorrect.
   * @param {string} usuario The username to login
   * @param {string} password The password of the user to login
   */
  public async login(usuario: string, password: string) {
    let loginUrl = environment.api + 'auth';
    let { token, rol } = await this.http.post<any>(loginUrl, { usuario, password }).toPromise();
    await this.store.set('usuario', { token, rol });
    if (rol == RolUsuario.ADMIN) {
      this._usuario = new Administrador(this.http, this);
    } else {
      this._usuario = new Voluntario(this.http, this);
    }
  }

  /**
   * Logs out the user in the system. It remove the user instance, and remove its info from the
   * localStorage.
   */
  public async logout() {
    this._usuario = undefined;
    await this.store.remove('usuario');
  }

  /**
   * Consult the user that has logged in in the system
   * @returns If the user has logged in, returns an object \{token,rol\}
   * Else returns undefined
   */
  public async userLoggedIn() {
    return this.store.get('usuario');
  }

  /**
   * Get the pets from the REST-API and cache them for 30 mins. If the pets has already been
   * cached, it returns the cached pets and avoid make the http request.
   * @param {bool=} forceReload If true it makes the httpRequest for the pets regardless
   * of if these have been cached or not
   * @returns An array of pets
   */
  public async getMascotas(forceReload = false) {
    let url = environment.api + 'mascota';
    if (forceReload || !this._mascotas || this.utils.cacheExpired(this._mascotas.time)) {
      let data = await this.http.get<any[]>(url).toPromise();
      let now = new Date().getTime();
      this._mascotas = { data: Mascota.deserialize(data), time: now };
    }
    return this._mascotas.data;
  }

  public async crearUsuario() {
    if (!this._usuario) {
      let usuario = await this.userLoggedIn();
      if (usuario.rol == RolUsuario.ADMIN) {
        this._usuario = new Administrador(this.http, this);
      } else if (usuario.rol == RolUsuario.VOLUNTARIO) {
        this._usuario = new Voluntario(this.http, this);
      }
    }
  }

  public async getMascotabyId(id:string) {
    let url = environment.api + 'mascota/'+ id;
    let data = await this.http.get<any[]>(url).toPromise();
    let pet = Mascota.deserializeOne(data);
    return pet;
  }

  public get voluntario() {
    return this._usuario as Voluntario;
  }

  public get admin() {
    return this._usuario as Administrador;
  }

  public get mascotas() {
    return this._mascotas.data;
  }
}
