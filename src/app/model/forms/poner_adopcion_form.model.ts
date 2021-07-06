import { Mascota } from '../mascota.model';
import { Formulario } from './formulario.model';

/**
 * Class extending from {@link Formulario} containing the information
 * of the form needed to put the pet up for adoption.
 * This form will be needed to be accepted by an admin.
 * @category Model
 */
export class FormularioPonerAdopcion extends Formulario {
  private _motivo: string;
  private _ubicacion: string[];
  private _mascota: Mascota;

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
