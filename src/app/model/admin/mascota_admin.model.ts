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
    await this.http.post<void>(url, mascotaApi).toPromise();
  }

  public eliminarMascota() {
    // TODO implementar método
  }

  public async actualizarMascota(id: string, mascota: Mascota) {
    let url = environment.api + 'mascota/' + id;
    let mascotaApi = Mascota.serialize(mascota);
    const index = this.sistema.mascotas.findIndex((pet) => pet.id == mascota.id);
    this.sistema.mascotas[index] = mascota;
    await this.http.put<any[]>(url, mascotaApi).toPromise();

    //this.sistema.mascotas.push(mascota);
  }
}
