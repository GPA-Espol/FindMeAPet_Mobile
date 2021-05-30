import { EstadoSolicitud } from './enums.model';
import { Voluntario } from './voluntario.model';

export class SolicitudActualizacionMascota {
  private _fecha: Date | String;
  private _voluntario: Voluntario;
  private _estado: EstadoSolicitud;

  //Getters y setters
  public get fecha(): Date | String {
    return this._fecha;
  }
  public set fecha(value: Date | String) {
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
