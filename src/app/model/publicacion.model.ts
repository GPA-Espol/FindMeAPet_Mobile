import * as moment from 'moment';
import { TipoPublicacion } from './enums.model';

/**
 * Class containing the data of a publication, it could be an event, or a new from GPA
 * @category Model
 */
export class Publicacion {
  private _id?: number;
  private _titulo: string;
  private _imagenUrl: string;
  private _descripcion: string;
  private _tag: string;
  private _tipo: TipoPublicacion;
  private _fecha: Date;
  private _idUsuario: number;

  static serialize(publication: Publicacion) {
    const dateISOString = publication.fecha.toISOString();
    const date = dateISOString.split("T")[0];
    return {
      titulo: publication.titulo,
      imagen: publication.imagenUrl,
      descripcion: publication.descripcion,
      tag: publication.tag || '',
      tipo_publicacion: publication.tipo,
      fecha: date,
      id_usuario: publication.idUsuario,
    };
  }

  static deserialize(publications: any[]) {
    return publications.map((publication) => Publicacion.deserialize_one(publication));
  }

  static deserialize_one(publication: any) {
    const publicationResult = new Publicacion();
    publicationResult.id = publication.id;
    publicationResult.titulo = publication.titulo;
    publicationResult.descripcion = publication.descripcion;
    publicationResult.imagenUrl = publication.imagen;
    publicationResult.tag = publication.tag;
    publicationResult.tipo = publication.tipo_publicacion;
    publicationResult.fecha = new Date(publication.fecha);
    publicationResult.idUsuario = publication.id_usuario;
    return publicationResult;
  }

  public get id(): number {
    return this._id;
  }

  public set id(value: number) {
    this._id = value;
  }

  public get titulo(): string {
    return this._titulo;
  }

  public set titulo(value: string) {
    this._titulo = value;
  }

  public get imagenUrl(): string {
    return this._imagenUrl;
  }

  public set imagenUrl(value: string) {
    this._imagenUrl = value;
  }

  public get descripcion(): string {
    return this._descripcion;
  }

  public set descripcion(value: string) {
    this._descripcion = value;
  }

  public get tag(): string {
    return this._tag;
  }

  public set tag(value: string) {
    this._tag = value;
  }

  public get tipo(): TipoPublicacion {
    return this._tipo;
  }

  public set tipo(value: TipoPublicacion) {
    this._tipo = value;
  }

  public get fecha(): Date {
    return this._fecha;
  }

  public set fecha(value: Date) {
    this._fecha = value;
  }

  public get idUsuario(): number {
    return this._idUsuario;
  }

  public set idUsuario(value: number) {
    this._idUsuario = value;
  }
}
