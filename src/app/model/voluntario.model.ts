import { HttpClient } from '@angular/common/http';
import { Dia, RolVoluntario } from './enums.model';
import { UsuarioGPA } from './usuario_gpa.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

/**
 * Class extending from {@link UsuarioGPA} containing the information of a volunteer,
 * and the functions it can do in the system.
 * @category Model
 */
export class Voluntario extends UsuarioGPA {
  private _rol: RolVoluntario[];
  private _horario: Dia[];

  static serialize(voluntario: Voluntario, password: string): any {
    const data = super.serialize(voluntario, password);
    data.rol = voluntario.rol;
    data.horario = voluntario.horario;
    return data;
  }

  static deserialize(data: any): Voluntario {
    const voluntario = new Voluntario(null, null);
    super.deserialize(data, voluntario);
    voluntario._rol = data.rol;
    voluntario._horario = data.horario;
    return voluntario;
  }

  constructor(http: HttpClient, sistema: SistemaService) {
    super(http, sistema);
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
    console.log('se envió la solicitud');

    // TODO implementar método
  }

  public hacerSolicitudCreacionMascota() {
    console.log('se envió la solicitud');
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
