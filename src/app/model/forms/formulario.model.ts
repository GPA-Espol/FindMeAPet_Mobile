import { EstadoSolicitud } from '../enums.model';

/**
 * Class containing the basic information needed to fill in the forms.
 * @category Model
 */
export class Formulario {
  protected _nombre: string;
  protected _apellido: string;
  protected _ciudad: string;
  protected _edad: string;
  protected _email: string;
  protected _fechaNacimiento: Date;
  protected _direccion: string;
  protected _estado: EstadoSolicitud;

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

  public get fechaNacimiento(): Date {
    return this._fechaNacimiento;
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
