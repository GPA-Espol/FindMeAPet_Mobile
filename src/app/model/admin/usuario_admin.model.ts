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

  public agregarVoluntario(voluntario: Voluntario, contrasena: string) {
    this.voluntarios.data.push(voluntario);
    const data = Voluntario.serialize(voluntario, contrasena);
    return this.http.post<any>(this.url, data).toPromise();
  }

  public agregarAdministrador(admin: Administrador, contrasena: string) {
    this.admins.data.push(admin);
    const data = Administrador.serialize(admin, contrasena);
    return this.http.post<any>(this.url, data).toPromise();
  }

  public eliminarVoluntario() {
    // TODO implementar método
  }

  public actualizarVoluntario() {
    // TODO implementar método
  }

  public eliminarAdministrador() {
    // TODO implementar método
  }

  public actualizarAdministrador() {
    // TODO implementar método
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
}
