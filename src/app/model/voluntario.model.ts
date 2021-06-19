import { HttpClient } from '@angular/common/http';
import { Dia, RolVoluntario } from './enums.model';
import { UsuarioGPA } from './usuario_gpa.model';

export class Voluntario extends UsuarioGPA {
  private _rol: RolVoluntario[];
  private _horario: Dia[];

  constructor(http: HttpClient) {
    super(http);
    this._rol = [];
    this._horario = [];
  }

  public reportarAsistencia() {
    // TODO implementar método
  }

  public reportarInasistencia() {
    // TODO implementar método
  }

  public aceptarActividadExtra() {
    // TODO implementar método
  }

  public hacerSolicitudActualizacionMascota() {
    // TODO implementar método
  }

  public agregarReporteAsistencia() {
    // TODO implementar método
  }

  public get rol(): RolVoluntario[] {
    return this._rol;
  }

  public get horario(): Dia[] {
    return this._horario;
  }
}
