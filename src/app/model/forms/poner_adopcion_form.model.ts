import { Mascota } from '../mascota.model';
import { Formulario } from './formulario.model';

export class FormularioPonerAdopcion extends Formulario {
  private _motivo: string;
  private _ubicacion: string[];
  private _mascota: Mascota;

  //Getters
  public get motivo(): string {
    return this._motivo;
  }
  public get ubicacion(): string[] {
    return this._ubicacion;
  }
  public get mascota(): Mascota {
    return this._mascota;
  }
}
