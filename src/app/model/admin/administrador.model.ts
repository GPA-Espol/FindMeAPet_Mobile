import { UsuarioGPA } from '../usuario_gpa.model';
import { AdministrarFormulario } from './form_admin.model';
import { AdministrarMascota } from './mascota_admin.model';
import { AdministrarPublicacion } from './publicacion_admin.model';
import { AdministrarReporteAsistencia } from './reporte_asistencia_admin.model';
import { AdministrarUsuario } from './usuario_admin.model';

export class Administrador extends UsuarioGPA {
  private _adminUsuario: AdministrarUsuario;
  private _adminReporteAsistencia: AdministrarReporteAsistencia;
  private _adminFormulario: AdministrarFormulario;
  private _adminMascota: AdministrarMascota;
  private _adminPublicacion: AdministrarPublicacion;

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
