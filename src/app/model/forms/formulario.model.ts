import { EstadoSolicitud } from '../enums.model';

export class Formulario {
  protected _CI: String;
  protected _nombre: String;
  protected _apellido: String;
  protected _ciudad: String;
  protected _edad: String;
  protected _email: String;
  protected _fecha: Date | String;
  protected _direccion: String;
  protected _estado: EstadoSolicitud;

  //Getters y Setters
  public get CI(): String {
    return this._CI;
  }
  public get nombre(): String {
    return this._nombre;
  }
  public get apellido(): String {
    return this._apellido;
  }
  public get ciudad(): String {
    return this._ciudad;
  }
  public get edad(): String {
    return this._edad;
  }
  public get email(): String {
    return this._email;
  }
  public get fecha(): Date | String {
    return this._fecha;
  }
  public get direccion(): String {
    return this._direccion;
  }
  public get estado(): EstadoSolicitud {
    return this._estado;
  }
  public set estado(value: EstadoSolicitud) {
    this._estado = value;
  }
}
