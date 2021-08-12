import { HttpClient } from '@angular/common/http';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { CantidadComida } from './enums.model';
import { ReporteAsistencia } from './reporte_asistencia.model';

/**
 * Abstract class containing the base information of a GPA User
 * @category Model
 */
export abstract class UsuarioGPA {
  private _id: number;
  protected _nombreUsuario: string;
  protected _nombre: string;
  protected _apellido: string;
  protected _correo: string;
  protected _fechaNacimiento: Date;
  protected _sexo: string;
  protected _isEstESPOL: boolean;
  protected _foto: string;
  private _estadoActivo: boolean;

  static serialize(usuarioGPA: UsuarioGPA, contrasena: string): any {
    let date = usuarioGPA.fechaNacimiento.toISOString();
    date = date.split('T')[0];
    return {
      id: usuarioGPA.id,
      usuario: usuarioGPA.nombreUsuario,
      contrasena,
      nombre: usuarioGPA.nombre,
      apellido: usuarioGPA.apellido,
      correo: usuarioGPA.correo,
      fecha_nacimiento: date,
      sexo: usuarioGPA.sexo,
      isEstESPOL: usuarioGPA.isEstESPOL,
      imagen_url: usuarioGPA.foto,
      estado: usuarioGPA.estadoActivo ? 'A' : 'I',
    };
  }

  static deserialize(data: any, usuarioGPA: UsuarioGPA) {
    usuarioGPA.id = data.id;
    usuarioGPA.nombreUsuario = data.usuario;
    usuarioGPA.nombre = data.nombre;
    usuarioGPA.apellido = data.apellido;
    usuarioGPA.correo = data.correo;
    usuarioGPA.fechaNacimiento = new Date(data.fecha_nacimiento);
    usuarioGPA.sexo = data.sexo;
    usuarioGPA.isEstESPOL = !!data.isEstESPOL;
    usuarioGPA.foto = data.imagen_url;
    usuarioGPA.estadoActivo = data.estado == 'A';
  }

  constructor(protected http: HttpClient, protected sistema: SistemaService) {}

  public verReportesAsistencia(): ReporteAsistencia[] {
    return ReporteAsistencia.deserialize([]);
  }

  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get nombreUsuario(): string {
    return this._nombreUsuario;
  }

  public set nombreUsuario(value: string) {
    this._nombreUsuario = value;
  }

  public get nombre(): string {
    return this._nombre;
  }

  public set nombre(value: string) {
    this._nombre = value;
  }

  public get apellido(): string {
    return this._apellido;
  }

  public set apellido(value: string) {
    this._apellido = value;
  }

  public get correo(): string {
    return this._correo;
  }
  public set correo(value: string) {
    this._correo = value;
  }

  public get fechaNacimiento(): Date {
    return this._fechaNacimiento;
  }

  public set fechaNacimiento(value: Date) {
    this._fechaNacimiento = value;
  }

  public get sexo(): string {
    return this._sexo;
  }

  public set sexo(value: string) {
    this._sexo = value;
  }

  public get isEstESPOL(): boolean {
    return this._isEstESPOL;
  }

  public set isEstESPOL(value: boolean) {
    this._isEstESPOL = value;
  }

  public get foto(): string {
    return this._foto;
  }

  public set foto(value: string) {
    this._foto = value;
  }

  protected get estadoActivo(): boolean {
    return this._estadoActivo;
  }
  protected set estadoActivo(value: boolean) {
    this._estadoActivo = value;
  }
}
