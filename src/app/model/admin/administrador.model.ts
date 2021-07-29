import { HttpClient } from '@angular/common/http';
import { UsuarioGPA } from '../usuario_gpa.model';
import { AdministrarFormulario } from './form_admin.model';
import { AdministrarMascota } from './mascota_admin.model';
import { AdministrarPublicacion } from './publicacion_admin.model';
import { AdministrarReporteAsistencia } from './reporte_asistencia_admin.model';
import { AdministrarUsuario } from './usuario_admin.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

/**
 * Class extending from {@link UsuarioGPA} with the aim of represent an Admin
 * in the system, and contain the actions that he/she can do.
 * The admin can do several actions in the system, so these actions were divided
 * into the classes {@link AdministrarUsuario}, {@link AdministrarReporteAsistencia},
 * {@link AdministrarFormulario}, {@link AdministrarMascota} and {@link AdministrarPublicacion}.
 * And this class is the responsible for grouping all of them.
 * @category Model
 */
export class Administrador extends UsuarioGPA {
  private _adminUsuario: AdministrarUsuario;
  private _adminReporteAsistencia: AdministrarReporteAsistencia;
  private _adminFormulario: AdministrarFormulario;
  private _adminMascota: AdministrarMascota;
  private _adminPublicacion: AdministrarPublicacion;

  constructor(http: HttpClient, sistema: SistemaService) {
    super(http, sistema);
    this._adminUsuario = new AdministrarUsuario();
    this._adminReporteAsistencia = new AdministrarReporteAsistencia();
    this._adminFormulario = new AdministrarFormulario();
    this._adminMascota = new AdministrarMascota(http, sistema);
    this._adminPublicacion = new AdministrarPublicacion(http);
  }

  public get adminUsuario(): AdministrarUsuario {
    return this._adminUsuario;
  }

  public get adminReporteAsistencia(): AdministrarReporteAsistencia {
    return this._adminReporteAsistencia;
  }

  public get adminFormulario(): AdministrarFormulario {
    return this._adminFormulario;
  }

  public get adminMascota(): AdministrarMascota {
    return this._adminMascota;
  }

  public get adminPublicacion(): AdministrarPublicacion {
    return this._adminPublicacion;
  }
}
