import { Formulario } from './formulario.model';

/**
 * Class containing the information of the form to be filled for adopting a pet.
 * This form will be needed to be accepted by an Admin
 * @category Model
 */
export class FormularioAdopcion extends Formulario {
  private _estadoCivil: string;
  private _numeroMascotas: number;
  private _motivo: string;
  private _contactoReferencia: string;
  private _usuarioFB: string;
  private _usuarioInstagram: string;
  private _isTieneMascotas: boolean;
  private _otrasMascotas: string;
  private _isMascotasEsterilizadas: boolean;
  private _isTeniaAntesMascotas: boolean;
  private _situacionMascotasAnteriores: string;
  private _isVisitaPeriodicas: boolean;
  private _motivoVisitasPeriodicas: string;
  private _isConvivenciaNinos: boolean;
  private _isAsmatico: boolean;
  private _tipoDomicilio: string;
  private _visicionAdoptado: string;
  private _isEspacioSuficiente: boolean;
  private _dondeDormirMascota: string;
  private _tiempoSolo: number;
  private _medidasTomaria: string;
  private _personaResponsable: string;
  private _isEsterilizaAdoptado: boolean;
  private _motivoEsterilizaAdoptado: string;
  private _situacionInesperadaCambios: string;

  public get estadoCivil(): string {
    return this._estadoCivil;
  }

  public get numeroMascotas(): number {
    return this._numeroMascotas;
  }

  public get motivo(): string {
    return this._motivo;
  }

  public get contactoReferencia(): string {
    return this._contactoReferencia;
  }

  public get usuarioFB(): string {
    return this._usuarioFB;
  }

  public get usuarioInstagram(): string {
    return this._usuarioInstagram;
  }

  public get isTieneMascotas(): boolean {
    return this._isTieneMascotas;
  }

  public get otrasMascotas(): string {
    return this._otrasMascotas;
  }

  public get isMascotasEsterilizadas(): boolean {
    return this._isMascotasEsterilizadas;
  }

  public get isTeniaAntesMascotas(): boolean {
    return this._isTeniaAntesMascotas;
  }

  public get situacionMascotasAnteriores(): string {
    return this._situacionMascotasAnteriores;
  }

  public get isVisitaPeriodicas(): boolean {
    return this._isVisitaPeriodicas;
  }

  public get motivoVisitasPeriodicas(): string {
    return this._motivoVisitasPeriodicas;
  }

  public get isConvivenciaNinos(): boolean {
    return this._isConvivenciaNinos;
  }

  public get isAsmatico(): boolean {
    return this._isAsmatico;
  }

  public get tipoDomicilio(): string {
    return this._tipoDomicilio;
  }

  public get visicionAdoptado(): string {
    return this._visicionAdoptado;
  }

  public get isEspacioSuficiente(): boolean {
    return this._isEspacioSuficiente;
  }

  public get dondeDormirMascota(): string {
    return this._dondeDormirMascota;
  }

  public get tiempoSolo(): number {
    return this._tiempoSolo;
  }

  public get medidasTomaria(): string {
    return this._medidasTomaria;
  }

  public get personaResponsable(): string {
    return this._personaResponsable;
  }

  public get isEsterilizaAdoptado(): boolean {
    return this._isEsterilizaAdoptado;
  }

  public get motivoEsterilizaAdoptado(): string {
    return this._motivoEsterilizaAdoptado;
  }

  public get situacionInesperadaCambios(): string {
    return this._situacionInesperadaCambios;
  }
}
