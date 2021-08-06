import { HttpClient } from '@angular/common/http';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { environment } from 'src/environments/environment';
import { Mascota } from '../mascota.model';

/**
 * Class containing the actions that the admin can do regarding the Pets.
 * @category Model
 */
export class AdministrarMascota {
  constructor(private http: HttpClient, private sistema: SistemaService) {}

  public async crearMascota(mascota: Mascota) {
    let url = environment.api + 'mascota';
    let mascotaApi = Mascota.serialize(mascota);
    this.sistema.mascotas.push(mascota);
    const { id } = await this.http.post<any>(url, mascotaApi).toPromise();
    mascota.id = id;
  }

  public async eliminarMascota(id: number) {
    let url = environment.api + 'mascota/' + id;
    const index = this.sistema.mascotas.findIndex((pet) => pet.id == +id);
    this.sistema.mascotas.splice(index, 1);
    await this.http.delete<any[]>(url).toPromise();
  }

  public async actualizarMascota(id: number, mascota: Mascota) {
    let url = environment.api + 'mascota/' + id;
    let mascotaApi = Mascota.serialize(mascota);
    const index = this.sistema.mascotas.findIndex((pet) => pet.id == mascota.id);
    this.sistema.mascotas[index] = mascota;
    await this.http.put<any[]>(url, mascotaApi).toPromise();

    //this.sistema.mascotas.push(mascota);
  }
}
