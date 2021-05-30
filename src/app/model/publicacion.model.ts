import { TipoPublicacion } from './enums.model';

export class Publicacion {
  private imagen: String;
  private descripcion: String;
  private tipo: TipoPublicacion;
  private fecha: Date | String;
}
