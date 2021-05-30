import { UserService } from '../services/user.service';

export abstract class UsuarioGPA {
  protected _nombreUsuario: String;
  protected _nombre: String;
  protected _apellido: String;
  protected _edad: String;
  protected _sexo: String;
  protected _isEstESPOL: boolean;
  protected _foto: String;

  constructor() {}

  public iniciarSesion() {
    // TODO implementar método
  }

  //Getters y Setters
  public get nombreUsuario(): String {
    return this._nombreUsuario;
  }
  public set nombreUsuario(value: String) {
    this._nombreUsuario = value;
  }
  public get nombre(): String {
    return this._nombre;
  }
  public set nombre(value: String) {
    this._nombre = value;
  }
  public get apellido(): String {
    return this._apellido;
  }
  public set apellido(value: String) {
    this._apellido = value;
  }
  public get edad(): String {
    return this._edad;
  }
  public set edad(value: String) {
    this._edad = value;
  }
  public get sexo(): String {
    return this._sexo;
  }
  public set sexo(value: String) {
    this._sexo = value;
  }
  public get isEstESPOL(): boolean {
    return this._isEstESPOL;
  }
  public set isEstESPOL(value: boolean) {
    this._isEstESPOL = value;
  }
  public get foto(): String {
    return this._foto;
  }
  public set foto(value: String) {
    this._foto = value;
  }
}
