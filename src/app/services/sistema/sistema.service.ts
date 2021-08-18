import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { CachedUser } from 'src/app/model/cached_user';
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

  constructor(private http: HttpClient, private store: StorageService, private firebase: FirebaseX) {}

  /**
   * Make an http request to log in the user in the system, and save his/her role and save the
   * jsonwebtoken in the localStorage and create the user instance if he/she logs in succesfuly.
   * @throws Error if the user or password are incorrect.
   * @param {string} usuario The username to login
   * @param {string} password The password of the user to login
   */
  public async login(usuario: string, password: string) {
    const loginUrl = environment.api + 'auth';
    const id_device = await this.firebase.getToken();
    const { token, rol, id } = await this.http
      .post<any>(loginUrl, { usuario, password, id_device })
      .toPromise();
    console.log(loginUrl);
    await this.store.set('usuario', { token, rol, id });
    if (rol == RolUsuario.ADMIN) {
      this._usuario = new Administrador(this.http, this);
    } else {
      this._usuario = new Voluntario(this.http, this);
    }
    this._usuario.id = id;
  }

  /**
   * Logs out the user in the system. It remove the user instance, remove its info from the
   * localStorage, and send a request to delete the user device.
   */
  public async logout() {
    this._usuario = undefined;
    await this.store.remove('usuario');
    const deleteUserDeviceUrl = environment.api + 'usuario/device';
    this.http.delete(deleteUserDeviceUrl);
  }

  /**
   * Consult the user that has logged in in the system
   * @returns If the user has logged in, returns an object \{token,rol\}
   * Else returns undefined
   */
  public async userLoggedIn(): Promise<CachedUser> {
    return this.store.get('usuario');
  }

  /**
   * Get the pets from the REST-API and cache them for 30 mins. If the pets has already been
   * cached, it returns the cached pets and avoid make the http request.
   * @param {boolean=} forceReload If true it makes the httpRequest for the pets regardless
   * of if these have been cached or not
   * @returns An array of pets
   */
  public async getMascotas(forceReload = false) {
    let url = environment.api + 'mascota';
    if (forceReload || !this._mascotas || Utils.cacheExpired(this._mascotas.time)) {
      let data = await this.http.get<any[]>(url).toPromise();
      let now = new Date().getTime();
      this._mascotas = { data: Mascota.deserialize(data), time: now };
    }
    return this._mascotas.data;
  }

  /**
   * Method that create a new user in the system depending on
   * the role that the backend sent when the user logged in.
   */
  public async crearUsuario() {
    if (!this._usuario) {
      let usuario = await this.userLoggedIn();
      if (usuario.rol == RolUsuario.ADMIN) {
        this._usuario = new Administrador(this.http, this);
      } else if (usuario.rol == RolUsuario.VOLUNTARIO) {
        this._usuario = new Voluntario(this.http, this);
      }
      this._usuario.id = usuario.id;
    }
  }

  /**
   * Consult a pet given by its id to the backend, and format it
   * to a System Mascota instance
   * @param {number} id The id of the pet
   * @param {boolean=} forceReload If true it makes the httpRequest for the pet regardless
   * @returns {Mascota} The pet instance mapped from the backend response
   */
  public async getMascotabyId(id: number, forceReload = false) {
    if (!this._mascotas || Utils.cacheExpired(this._mascotas.time) || forceReload) {
      return await this.requestPet(id);
    }
    const pet = this._mascotas.data.find((pet) => pet.id == id);
    return pet || (await this.requestPet(id));
  }

  private async requestPet(id: number) {
    const url = environment.api + 'mascota/' + id;
    const data = await this.http.get<any[]>(url).toPromise();
    return Mascota.deserializeOne(data);
  }
  /**
   * Get the user logged in as a Voluntario instance
   */
  public get voluntario() {
    return this._usuario as Voluntario;
  }

  /**
   * Get the user logged in as an Administrador instance
   */
  public get admin() {
    return this._usuario as Administrador;
  }

  /**
   * Get the pets that have been cached in the system
   */
  public get mascotas() {
    return this._mascotas.data;
  }
}
