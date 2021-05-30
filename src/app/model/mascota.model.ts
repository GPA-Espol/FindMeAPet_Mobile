import { Personalidad, UbicacionMascota } from './enums.model';

export class Mascota {
  private _nombre: String;
  private _edad: number;
  private _color: String;
  private _ublicacionMascota: UbicacionMascota;
  private _isEsterilizado: boolean;
  private _isAdoptado: boolean;
  private _isCasoExterno: boolean;
  private _isAdoptable: boolean;
  private _descripcion: String;
  private _personalidadL: Personalidad[];
  private _sexo: String;
  private _tipoAnimal: String;

  //Getters y Setters
  public get nombre(): String {
    return this._nombre;
  }
  public set nombre(value: String) {
    this._nombre = value;
  }

  public get edad(): number {
    return this._edad;
  }
  public set edad(value: number) {
    this._edad = value;
  }

  public get color(): String {
    return this._color;
  }
  public set color(value: String) {
    this._color = value;
  }

  public get ublicacionMascota(): UbicacionMascota {
    return this._ublicacionMascota;
  }
  public set ublicacionMascota(value: UbicacionMascota) {
    this._ublicacionMascota = value;
  }

  public get isEsterilizado(): boolean {
    return this._isEsterilizado;
  }
  public set isEsterilizado(value: boolean) {
    this._isEsterilizado = value;
  }

  public get isAdoptado(): boolean {
    return this._isAdoptado;
  }
  public set isAdoptado(value: boolean) {
    this._isAdoptado = value;
  }

  public get isCasoExterno(): boolean {
    return this._isCasoExterno;
  }
  public set isCasoExterno(value: boolean) {
    this._isCasoExterno = value;
  }

  public get isAdoptable(): boolean {
    return this._isAdoptable;
  }
  public set isAdoptable(value: boolean) {
    this._isAdoptable = value;
  }

  public get descripcion(): String {
    return this._descripcion;
  }
  public set descripcion(value: String) {
    this._descripcion = value;
  }

  public get personalidadL(): Personalidad[] {
    return this._personalidadL;
  }
  public set personalidadL(value: Personalidad[]) {
    this._personalidadL = value;
  }
  public get sexo(): String {
    return this._sexo;
  }
  public set sexo(value: String) {
    this._sexo = value;
  }
  public get tipoAnimal(): String {
    return this._tipoAnimal;
  }
  public set tipoAnimal(value: String) {
    this._tipoAnimal = value;
  }
}
