import { Dia, RolVoluntario } from './enums.model';
import { UsuarioGPA } from './usuario_gpa.model';

export class Voluntario extends UsuarioGPA {
  private _rol: RolVoluntario[];
  private _horario: Dia[];

  constructor() {
    super();
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

  //Getters y Setters
  public get rol(): RolVoluntario[] {
    return this._rol;
  }

  public get horario(): Dia[] {
    return this._horario;
  }
}
