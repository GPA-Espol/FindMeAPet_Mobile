import { Formulario } from './formulario.model';

export class FormularioAdopcion extends Formulario {
  private _estadoCivil: String;
  private _numeroMascotas: number;
  private _motivo: String;
  private _contactoReferencia: String;
  private _usuarioFB: String;
  private _usuarioInstagram: String;
  private _isTieneMascotas: boolean;
  private _otrasMascotas: String;
  private _isMascotasEsterilizadas: boolean;
  private _isTeniaAntesMascotas: boolean;
  private _situacionMascotasAnteriores: String;
  private _isVisitaPeriodicas: boolean;
  private _motivoVisitasPeriodicas: String;
  private _isConvivenciaNinos: boolean;
  private _isAsmatico: boolean;
  private _tipoDomicilio: String;
  private _visicionAdoptado: String;
  private _isEspacioSuficiente: boolean;
  private _dondeDormirMascota: String;
  private _tiempoSolo: number;
  private _medidasTomaria: String;
  private _personaResponsable: String;
  private _isEsterilizaAdoptado: boolean;
  private _motivoEsterilizaAdoptado: String;
  private _situacionInesperadaCambios: String;

  //Getters y Setters
  public get estadoCivil(): String {
    return this._estadoCivil;
  }
  public get numeroMascotas(): number {
    return this._numeroMascotas;
  }
  public get motivo(): String {
    return this._motivo;
  }
  public get contactoReferencia(): String {
    return this._contactoReferencia;
  }
  public get usuarioFB(): String {
    return this._usuarioFB;
  }
  public get usuarioInstagram(): String {
    return this._usuarioInstagram;
  }
  public get isTieneMascotas(): boolean {
    return this._isTieneMascotas;
  }
  public get otrasMascotas(): String {
    return this._otrasMascotas;
  }
  public get isMascotasEsterilizadas(): boolean {
    return this._isMascotasEsterilizadas;
  }

  public get isTeniaAntesMascotas(): boolean {
    return this._isTeniaAntesMascotas;
  }
  public get situacionMascotasAnteriores(): String {
    return this._situacionMascotasAnteriores;
  }
  public get isVisitaPeriodicas(): boolean {
    return this._isVisitaPeriodicas;
  }
  public get motivoVisitasPeriodicas(): String {
    return this._motivoVisitasPeriodicas;
  }
  public get isConvivenciaNinos(): boolean {
    return this._isConvivenciaNinos;
  }
  public get isAsmatico(): boolean {
    return this._isAsmatico;
  }
  public get tipoDomicilio(): String {
    return this._tipoDomicilio;
  }
  public get visicionAdoptado(): String {
    return this._visicionAdoptado;
  }
  public get isEspacioSuficiente(): boolean {
    return this._isEspacioSuficiente;
  }
  public get dondeDormirMascota(): String {
    return this._dondeDormirMascota;
  }
  public get tiempoSolo(): number {
    return this._tiempoSolo;
  }
  public get medidasTomaria(): String {
    return this._medidasTomaria;
  }
  public get personaResponsable(): String {
    return this._personaResponsable;
  }
  public get isEsterilizaAdoptado(): boolean {
    return this._isEsterilizaAdoptado;
  }
  public get motivoEsterilizaAdoptado(): String {
    return this._motivoEsterilizaAdoptado;
  }
  public get situacionInesperadaCambios(): String {
    return this._situacionInesperadaCambios;
  }
}
