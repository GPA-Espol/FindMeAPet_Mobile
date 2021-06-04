import { EstadoSolicitud } from '../enums.model';

export class Formulario {
  protected _CI: string;
  protected _nombre: string;
  protected _apellido: string;
  protected _ciudad: string;
  protected _edad: string;
  protected _email: string;
  protected _fecha: Date | string;
  protected _direccion: string;
  protected _estado: EstadoSolicitud;

  //Getters y Setters
  public get CI(): string {
    return this._CI;
  }
  public get nombre(): string {
    return this._nombre;
  }
  public get apellido(): string {
    return this._apellido;
  }
  public get ciudad(): string {
    return this._ciudad;
  }
  public get edad(): string {
    return this._edad;
  }
  public get email(): string {
    return this._email;
  }
  public get fecha(): Date | string {
    return this._fecha;
  }
  public get direccion(): string {
    return this._direccion;
  }
  public get estado(): EstadoSolicitud {
    return this._estado;
  }
  public set estado(value: EstadoSolicitud) {
    this._estado = value;
  }
}
