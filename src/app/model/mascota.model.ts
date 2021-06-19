import { Personalidad, UbicacionMascota } from './enums.model';

export class Mascota {
  private _nombre: string;
  private _edad: number;
  private _color: string;
  private _ublicacionMascota: UbicacionMascota;
  private _isEsterilizado: boolean;
  private _isAdoptado: boolean;
  private _isCasoExterno: boolean;
  private _isAdoptable: boolean;
  private _descripcion: string;
  private _personalidadL: Personalidad[];
  private _sexo: string;
  private _tipoAnimal: string;

  static deserialize(data: any[]) {
    return data.map((mascota) => {
      let mascotaResult = new Mascota();
      Object.assign(mascotaResult, mascota);
      mascotaResult._isEsterilizado = mascota.is_esterilizado;
      mascotaResult._isAdoptable = mascota.is_adoptable;
      mascotaResult._isAdoptado = mascota.is_adoptado;
      mascotaResult._isCasoExterno = mascota.is_caso_externo;
      return mascotaResult;
    });
  }

  //Getters y Setters
  public get nombre(): string {
    return this._nombre;
  }

  public set nombre(value: string) {
    this._nombre = value;
  }

  public get edad(): number {
    return this._edad;
  }

  public set edad(value: number) {
    this._edad = value;
  }

  public get color(): string {
    return this._color;
  }

  public set color(value: string) {
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

  public get descripcion(): string {
    return this._descripcion;
  }

  public set descripcion(value: string) {
    this._descripcion = value;
  }

  public get personalidadL(): Personalidad[] {
    return this._personalidadL;
  }

  public set personalidadL(value: Personalidad[]) {
    this._personalidadL = value;
  }

  public get sexo(): string {
    return this._sexo;
  }

  public set sexo(value: string) {
    this._sexo = value;
  }

  public get tipoAnimal(): string {
    return this._tipoAnimal;
  }

  public set tipoAnimal(value: string) {
    this._tipoAnimal = value;
  }
}
