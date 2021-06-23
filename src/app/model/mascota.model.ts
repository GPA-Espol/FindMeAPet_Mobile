import * as moment from 'moment';
import { Personalidad, UbicacionMascota } from './enums.model';

/**
 * Class representing the pets in the system.
 * @category Model
 */
export class Mascota {
  private _id: number;
  private _nombre: string;
  private _fechaNacimiento: Date;
  private _color: string;
  private _ubicacion: UbicacionMascota;
  private _isEsterilizado: boolean;
  private _isAdoptado: boolean;
  private _isCasoExterno: boolean;
  private _isAdoptable: boolean;
  private _descripcion: string;
  private _personalidadL: Personalidad[];
  private _sexo: string;
  private _tipoAnimal: string;
  private _imagenUrl: string;

  /**
   * Method to synchronize the data obtained from the REST-API to the Model that we have in
   * the ionic System.
   * @param {any[]} data The responsed array of pets from the REST-API
   * @returns {Mascota[]} Array of objects instance of {@link Mascota}
   */
  static deserialize(data: any[]) {
    return data.map((mascota) => {
      let mascotaResult = new Mascota();
      mascotaResult._id = mascota.id;
      mascotaResult.nombre = mascota.nombre;
      mascotaResult.fechaNacimiento = new Date(mascota.fecha_nacimiento);
      mascotaResult.color = mascota.color;
      mascotaResult.isEsterilizado = !!mascota.is_esterilizado;
      mascotaResult.isAdoptable = !!mascota.is_adoptable;
      mascotaResult.isAdoptado = !!mascota.is_adoptado;
      mascotaResult.isCasoExterno = !!mascota.is_caso_externo;
      mascotaResult.descripcion = mascota.descripcion;
      mascotaResult.sexo = mascota.sexo;
      mascotaResult.ubicacionMascota = mascota.ubicacion;
      mascotaResult.tipoAnimal = mascota.tipo_mascota;
      mascotaResult.imagenUrl = mascota.imagen_url;
      return mascotaResult;
    });
  }

  /**
   * Method to synchronize the Model that we have in the ionic System with
   * the data that the API recieves.
   * @param {any[]} data The responsed array of pets from the REST-API
   * @returns {Mascota[]} Array of objects instance of {@link Mascota}
   */
  static serialize(mascota: Mascota) {
    return {
      nombre: mascota.nombre,
      fecha_nacimiento: moment(mascota.fechaNacimiento).format('YYYY-MM-DD'),
      color: mascota.color,
      is_esterilizado: mascota.isEsterilizado ? 1 : 0,
      is_adoptado: mascota.isAdoptado ? 1 : 0,
      is_caso_externo: mascota.isCasoExterno ? 1 : 0,
      is_adoptable: mascota.isAdoptable ? 1 : 0,
      descripcion: mascota.descripcion,
      sexo: mascota.sexo,
      ubicacion: mascota.ubicacionMascota,
      tipo_mascota: mascota.tipoAnimal,
      imagen_url: mascota.imagenUrl,
    };

    /*let mascotaResult = new Mascota();
      mascotaResult._id = mascota.id;
      mascotaResult.nombre = mascota.nombre;
      mascotaResult.fechaNacimiento = new Date(mascota.fecha_nacimiento);
      mascotaResult.color = mascota.color;
      mascotaResult.isEsterilizado = !!mascota.is_esterilizado;
      mascotaResult.isAdoptable = !!mascota.is_adoptable;
      mascotaResult.isAdoptado = !!mascota.is_adoptado;
      mascotaResult.isCasoExterno = !!mascota.is_caso_externo;
      mascotaResult.descripcion = mascota.descripcion;
      mascotaResult.sexo = mascota.sexo;
      mascotaResult.ubicacionMascota = mascota.ubicacion;
      mascotaResult.tipoAnimal = mascota.tipo_mascota;
      mascotaResult.imagenUrl = mascota.imagen_url;
      return mascotaResult;*/
  }

  public get id(): number {
    return this._id;
  }

  public get nombre(): string {
    return this._nombre;
  }

  public set nombre(value: string) {
    this._nombre = value;
  }

  public get fechaNacimiento(): Date {
    return this._fechaNacimiento;
  }

  public set fechaNacimiento(value: Date) {
    this._fechaNacimiento = value;
  }

  public get color(): string {
    return this._color;
  }

  public set color(value: string) {
    this._color = value;
  }

  public get ubicacionMascota(): UbicacionMascota {
    return this._ubicacion;
  }

  public set ubicacionMascota(value: UbicacionMascota) {
    this._ubicacion = value;
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

  public get imagenUrl(): string {
    return this._imagenUrl;
  }
  public set imagenUrl(value: string) {
    this._imagenUrl = value;
  }
}
