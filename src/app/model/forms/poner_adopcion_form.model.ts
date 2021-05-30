import { Mascota } from '../mascota.model';
import { Formulario } from './formulario.model';

export class FormularioPonerAdopcion extends Formulario {
  private _motivo: String;
  private _ubicacion: String[];
  private _mascota: Mascota;

  //Getters
  public get motivo(): String {
    return this._motivo;
  }
  public get ubicacion(): String[] {
    return this._ubicacion;
  }
  public get mascota(): Mascota {
    return this._mascota;
  }
}
