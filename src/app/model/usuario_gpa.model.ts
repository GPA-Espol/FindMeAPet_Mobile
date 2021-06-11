import { HttpClient } from '@angular/common/http';

export abstract class UsuarioGPA {
  protected _nombreUsuario: string;
  protected _nombre: string;
  protected _apellido: string;
  protected _edad: string;
  protected _sexo: string;
  protected _isEstESPOL: boolean;
  protected _foto: string;

  constructor(protected http: HttpClient) {}

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
  public get edad(): string {
    return this._edad;
  }
  public set edad(value: string) {
    this._edad = value;
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
}
