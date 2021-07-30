import { RolUsuario } from './enums.model';

export interface CachedUser {
  token: string;
  rol: RolUsuario;
  id: number;
}
