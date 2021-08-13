import { HttpClient } from '@angular/common/http';
import { Utils } from 'src/app/utils/utils';
import { environment } from 'src/environments/environment';
import { UsuarioGPA } from '../usuario_gpa.model';
import { Voluntario } from '../voluntario.model';
import { Administrador } from './administrador.model';

/**
 * Class containing the actions that the admin can do regarding the all users
 * @category Model
 */
export class AdministrarUsuario {
  private url = environment.api + 'usuario';

  private voluntarios: { data: Voluntario[]; time: number };
  private admins: { data: Administrador[]; time: number };

  constructor(private http: HttpClient) {}

  public async agregarVoluntario(voluntario: Voluntario, contrasena?: string) {
    const data = Voluntario.serialize(voluntario, contrasena);
    data.estado = 'A';
    const { id } = await this.http.post<any>(this.url, data).toPromise();
    voluntario.id = id;
    this.voluntarios.data.push(voluntario);
  }

  public async agregarAdministrador(admin: Administrador, contrasena: string) {
    const data = Administrador.serialize(admin, contrasena);
    data.estado = 'A';
    const { id } = await this.http.post<any>(this.url, data).toPromise();
    admin.id = id;
    this.admins.data.push(admin);
  }

  public eliminarUsuario(id: number) {
    const index = this.voluntarios.data.findIndex((vol) => vol.id === id);
    if (index !== -1) {
      this.voluntarios.data.splice(index, 1);
    } else {
      const index = this.admins.data.findIndex((admin) => admin.id === id);
      if (index !== -1) {
        this.admins.data.splice(index, 1);
      }
    }
    return this.http.delete<any>(`${this.url}/${id}`).toPromise();
  }

  public actualizarVoluntario(voluntario: Voluntario, contrasena?: string) {
    const index = this.admins.data.findIndex((vol) => vol.id === voluntario.id);
    if (index !== -1) {
      this.admins.data.splice(index, 1);
      this.voluntarios.data.push(voluntario);
    } else {
      const index = this.voluntarios.data.findIndex((vol) => vol.id === voluntario.id);
      this.voluntarios.data[index] = voluntario;
    }
    const data = Voluntario.serialize(voluntario, contrasena);
    data.estado = 'A';
    return this.http.put<void>(`${this.url}/${voluntario.id}`, data).toPromise();
  }

  public actualizarAdministrador(admin: Administrador, contrasena: string) {
    const index = this.voluntarios.data.findIndex((vol) => vol.id === admin.id);
    if (index !== -1) {
      this.voluntarios.data.splice(index, 1);
      this.admins.data.push(admin);
    } else {
      const index = this.admins.data.findIndex((admin) => admin.id === admin.id);
      this.admins.data[index] = admin;
    }
    this.admins.data[index] = admin;
    const data = Administrador.serialize(admin, contrasena);
    data.estado = 'A';
    return this.http.put<void>(`${this.url}/${admin.id}`, data).toPromise();
  }

  public async obtenerUsuarios(forceReload = false) {
    if (forceReload || !this.voluntarios || Utils.cacheExpired(this.voluntarios.time)) {
      //It is not necessary to check booth lists since booth are created at the same time
      const usuarios = await this.http.get<any[]>(this.url).toPromise();
      const admins = usuarios
        .filter((usuario) => usuario.id_rol === 1)
        .map((usuario) => Administrador.deserialize(usuario));
      const vols = usuarios
        .filter((usuario) => usuario.id_rol === 2)
        .map((usuario) => Voluntario.deserialize(usuario));
      const now = new Date().getTime();
      this.voluntarios = { data: vols, time: now };
      this.admins = { data: admins, time: now };
    }
    return { admins: this.admins.data, voluntarios: this.voluntarios.data };
  }

  public async obtenerUsuarioPorId(id: number, forceReload = false) {
    if (forceReload || !this.voluntarios || Utils.cacheExpired(this.voluntarios.time)) {
      const usuario = await this.http.get<any>(`${this.url}/${id}`).toPromise();
      if (usuario.id_rol == 1) {
        return Administrador.deserialize(usuario);
      } else {
        return Voluntario.deserialize(usuario);
      }
    }
    return this.findUser(id);
  }

  private findUser(id) {
    const user = this.voluntarios.data.find((vol) => vol.id === id);
    return user || this.admins.data.find((admin) => admin.id === id);
  }
}
