import { CantidadComida } from './enums.model';

export class ReporteAsistencia {
  private _fecha: string | Date;
  private _comida: CantidadComida;
  private _anomalia: string;
  private _mapa: string;
  private _fotoL: string[];

  constructor() {
    this._fotoL = [];
  }

  // Getters and Setters
  public get fecha(): string | Date {
    return this._fecha;
  }
  public set fecha(value: string | Date) {
    this._fecha = value;
  }

  public get comida(): CantidadComida {
    return this._comida;
  }
  public set comida(value: CantidadComida) {
    this._comida = value;
  }

  public get anomalia(): string {
    return this._anomalia;
  }
  public set anomalia(value: string) {
    this._anomalia = value;
  }

  public get mapa(): string {
    return this._mapa;
  }
  public set mapa(value: string) {
    this._mapa = value;
  }

  public get fotoL(): string[] {
    return this._fotoL;
  }
}
