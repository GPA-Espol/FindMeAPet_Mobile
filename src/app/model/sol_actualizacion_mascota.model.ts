import { EstadoSolicitud } from './enums.model';
import { Voluntario } from './voluntario.model';
/**
 * Class containing the data of a update request of a pet from an Volunteer
 * to an Admin
 * @category Model
 */
export class SolicitudActualizacionMascota {
  private _fecha: Date | string;
  private _voluntario: Voluntario;
  private _estado: EstadoSolicitud;

  public get fecha(): Date | string {
    return this._fecha;
  }

  public set fecha(value: Date | string) {
    this._fecha = value;
  }

  public get voluntario(): Voluntario {
    return this._voluntario;
  }

  public set voluntario(value: Voluntario) {
    this._voluntario = value;
  }

  public get estado(): EstadoSolicitud {
    return this._estado;
  }

  public set estado(value: EstadoSolicitud) {
    this._estado = value;
  }
}
