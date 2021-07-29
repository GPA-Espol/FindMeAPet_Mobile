import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Publicacion } from '../publicacion.model';

/**
 * Class containing the actions that the admin can do regarding the publications.
 * @category Model
 */
export class AdministrarPublicacion {
  private url = environment.api + 'publicacion';
  constructor(private http: HttpClient) {}

  public async verPublicaciones() {
    const res = await this.http.get<any[]>(this.url).toPromise();
    return Publicacion.deserialize(res);
  }

  public async verPublicacion(publicationId: number) {
    const url = `${this.url}/${publicationId}`;
    const res = await this.http.get<any>(url).toPromise();
    return Publicacion.deserialize_one(res);
  }

  public crearPublicacion(publication: Publicacion) {
    const body = Publicacion.serialize(publication);
    console.log(body);

    return this.http.post(this.url, body).toPromise();
  }

  public eliminarPublicacion(publicationId: number) {
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
