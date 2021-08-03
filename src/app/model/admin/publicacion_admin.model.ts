import { HttpClient } from '@angular/common/http';
import { Utils } from 'src/app/utils/utils';
import { environment } from 'src/environments/environment';
import { Publicacion } from '../publicacion.model';

/**
 * Class containing the actions that the admin can do regarding the publications.
 * @category Model
 */
export class AdministrarPublicacion {
  private url = environment.api + 'publicacion';

  private publicaciones: { data: Publicacion[]; time: number };

  constructor(private http: HttpClient) {}

  public async verPublicaciones(forceReload = false) {
    if (forceReload || !this.publicaciones || Utils.cacheExpired(this.publicaciones.time)) {
      const res = await this.http.get<any[]>(this.url).toPromise();
      const now = new Date().getTime();
      this.publicaciones = { data: Publicacion.deserialize(res), time: now };
    }
    return this.publicaciones.data;
  }

  public async verPublicacion(publicationId: number) {
    const url = `${this.url}/${publicationId}`;
    const res = await this.http.get<any>(url).toPromise();
    return Publicacion.deserialize_one(res);
  }

  public async crearPublicacion(publication: Publicacion) {
    if (!this.publicaciones) {
      this.publicaciones = { data: [], time: new Date().getTime() };
    }
    const body = Publicacion.serialize(publication);
    this.publicaciones.data.push(publication);
    const { id } = await this.http.post<any>(this.url, body).toPromise();
    publication.id = id;
  }

  public eliminarPublicacion(publicationId: number) {
    if (!this.publicaciones) {
      this.publicaciones = { data: [], time: new Date().getTime() };
    }
    const indexPub = this.publicaciones.data.findIndex((publication) => publication.id === publicationId);
    this.publicaciones.data.splice(indexPub, 1);
    const url = `${this.url}/${publicationId}`;
    return this.http.delete(url).toPromise();
  }

  public actualizarPublicacion(publication: Publicacion) {
    const publicationId = publication.id;
    const body = Publicacion.serialize(publication);
    const url = `${this.url}/${publicationId}`;
    return this.http.put(url, body).toPromise();
  }
}
