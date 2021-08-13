import { HttpClient } from '@angular/common/http';
import { Dia, RolVoluntario } from './enums.model';
import { UsuarioGPA } from './usuario_gpa.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { Mascota } from './mascota.model';
import { Utils } from '../utils/utils';
import { environment } from 'src/environments/environment';

/**
 * Class extending from {@link UsuarioGPA} containing the information of a volunteer,
 * and the functions it can do in the system.
 * @category Model
 */
export class Voluntario extends UsuarioGPA {
  private _rol: RolVoluntario[];
  private _horario: Dia[];

  constructor(http: HttpClient, sistema: SistemaService) {
    super(http, sistema);
    this._rol = [];
    this._horario = [];
  }

  public reportarAsistencia() {
    // TODO implementar método
  }

  public reportarInasistencia() {
    // TODO implementar método
  }

  public aceptarActividadExtra() {
    // TODO implementar método
  }

  public async hacerSolicitudActualizacionMascota(oldPet: Mascota, requestPet: Mascota, idMascotta: number) {
    let url = environment.api + 'solicitud';
    let petChanges = Utils.getObjectDifference(oldPet, Mascota.serialize(requestPet));
    petChanges['id_mascota'] = idMascotta
    console.log(petChanges);
    await this.http.post<any>(url, petChanges).toPromise();
    console.log('se envió la solicitud');


  }

  public async hacerSolicitudCreacionMascota(pet: Mascota) {
    let url = environment.api + 'solicitud';
    console.log("mascota a enviar", Mascota.serialize(pet));
    
    await this.http.post<any>(url, Mascota.serialize(pet)).toPromise();


  }


  public agregarReporteAsistencia() {
    // TODO implementar método
  }

  public get rol(): RolVoluntario[] {
    return this._rol;
  }

  public get horario(): Dia[] {
    return this._horario;
  }
}
