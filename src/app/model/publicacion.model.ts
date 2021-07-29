import * as moment from 'moment';
import { TipoPublicacion } from './enums.model';

/**
 * Class containing the data of a publication, it could be an event, or a new from GPA
 * @category Model
 */
export class Publicacion {
  private _id?: number;
  private _titulo: string;
  private _imagen: string;
  private _descripcion: string;
  private _tag: string;
  private _tipo: TipoPublicacion;
  private _fecha: Date | string;
  private _idUsuario: number;

  static serialize(publication: Publicacion) {
    return {
      titulo: publication.titulo,
      imagen: publication.imagen,
      descripcion: publication.descripcion,
      tag: publication.tag || '',
      tipo_publicacion: publication.tipo,
      fecha: moment(publication.fecha).format('YYYY-MM-DD'),
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
    publicationResult.imagen = publication.imagen;
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

  public get fecha(): Date | string {
    return this._fecha;
  }

  public set fecha(value: Date | string) {
    this._fecha = value;
  }

  public get idUsuario(): number {
    return this._idUsuario;
  }

  public set idUsuario(value: number) {
    this._idUsuario = value;
  }
}
