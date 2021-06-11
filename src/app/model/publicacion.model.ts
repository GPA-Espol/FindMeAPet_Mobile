import { TipoPublicacion } from './enums.model';

export class Publicacion {
  private imagen: string;
  private descripcion: string;
  private tipo: TipoPublicacion;
  private fecha: Date | string;
}
