import * as moment from 'moment';

import { CantidadComida } from './enums.model';

/**
 * Class containing the data of the assitence report
 * @category Model
 */
export class ReporteAsistencia {
  private _fecha: string | Date;
  private _comida: CantidadComida;
  private _anomalia: string;
  private _mapa: string;
  private _fotoL: string[];

  constructor() {
    this._fotoL = [];
  }

  /**
   * Method to synchronize the data obtained from the REST-API to the Model that we have in
   * the ionic System.
   * @param {any[]} data The responsed array of pets from the REST-API
   * @returns {ReporteAsistencia[]} Array of objects instance of {@link ReporteAsistencia}
   */
  static deserialize(data: any[]) {
    return data.map((reporte) => {
      let reporteResult = new ReporteAsistencia();
      reporteResult.anomalia = reporte.anomalia;
      reporteResult.fecha = new Date(reporte.fecha);
      reporteResult.comida = reporte.comida;
      reporteResult._fotoL = reporte.fotoL;
      reporteResult.mapa = reporte.mapa;
      return reporteResult;
    });
  }

  /**
   * Method to synchronize the Model ReporteAsistencia that we have in the ionic System with
   * the data that the API recieves.
   * @param {ReporteAsistencia} reporte The pet you want to send through the API
   * @returns {any} Object with the fields compatible with the API
   */
  static serialize(reporte: ReporteAsistencia) {
    return {
      anomalia: reporte.anomalia,
      fecha: moment(reporte.fecha).format('YYYY-MM-DD'),
      comida: reporte.comida,
      fotoL: reporte.fotoL,
      mapa: reporte.mapa,
    };
  }

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
