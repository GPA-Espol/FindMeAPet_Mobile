import { CantidadComida } from './enums.model';

export class ReporteAsistencia {
  private _fecha: String | Date;
  private _comida: CantidadComida;
  private _anomalia: String;
  private _mapa: String;
  private _fotoL: String[];

  constructor() {
    this._fotoL = [];
  }

  // Getters and Setters
  public get fecha(): String | Date {
    return this._fecha;
  }
  public set fecha(value: String | Date) {
    this._fecha = value;
  }

  public get comida(): CantidadComida {
    return this._comida;
  }
  public set comida(value: CantidadComida) {
    this._comida = value;
  }

  public get anomalia(): String {
    return this._anomalia;
  }
  public set anomalia(value: String) {
    this._anomalia = value;
  }

  public get mapa(): String {
    return this._mapa;
  }
  public set mapa(value: String) {
    this._mapa = value;
  }

  public get fotoL(): String[] {
    return this._fotoL;
  }
}
