import { TipoPublicacion } from './enums.model';

/**
 * Class containing the data of a publication, it could be an event, or a new from GPA
 * @category Model
 */
export class Publicacion {
  private _titulo: string;
  private _imagen: string;
  private _descripcion: string;
  private _tipo: TipoPublicacion;
  private _fecha: Date | string;

  public get titulo(): string {
    return this._titulo;
  }

  public set titulo(value: string) {
    this._titulo = value;
  }

  public get imagen(): string {
    return this._imagen;
  }

  public set imagen(value: string) {
    this._imagen = value;
  }

  public get descripcion(): string {
    return this._descripcion;
  }

  public set descripcion(value: string) {
    this._descripcion = value;
  }

  public get tipo(): TipoPublicacion {
    return this._tipo;
  }

  public set tipo(value: TipoPublicacion) {
    this._tipo = value;
  }

  public get fecha(): Date | string {
    return this._fecha;
  }

  public set fecha(value: Date | string) {
    this._fecha = value;
  }
}
