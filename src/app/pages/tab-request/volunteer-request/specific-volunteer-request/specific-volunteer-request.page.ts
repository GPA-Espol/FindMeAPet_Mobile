import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { Mascota } from 'src/app/model/mascota.model';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { Mode } from 'src/app/utils/utils';

@Component({
  selector: 'app-specific-volunteer-request',
  templateUrl: './specific-volunteer-request.page.html',
  styleUrls: ['./specific-volunteer-request.page.scss'],
})
export class SpecificVolunteerRequestPage implements OnInit {
  administrador: Administrador;
  actualPet: Mascota;
  requestPet: Mascota;
  propuesta: any;
  mode: String;
  send: any = {};
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  constructor(
    private sistema: SistemaService,
    private route: ActivatedRoute,
    private alertaService: AlertaService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.administrador = this.sistema.admin;

    this.getPropuesta();

    await this.setMode();
  }

  getPropuesta() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.send.id_solicitud = id;
    this.propuesta = this.administrador.adminMascota.verPropuestasVoluntarioById(id);
  }

  async setMode() {
    this.mode = this.propuesta.id_mascota ? Mode.EDITAR : Mode.ANADIR;

    if (this.mode == Mode.EDITAR) {
      this.actualPet = await this.sistema.getMascotabyId(this.propuesta.id_mascota);
    }
    this.requestPet = Mascota.deserializeOne(this.propuesta);
    this.requestPet.isAdoptable = this.propuesta.is_adoptable;
    this.requestPet.isAdoptado = this.propuesta.is_adoptado;
    this.requestPet.isCasoExterno = this.propuesta.is_caso_externo;
    this.requestPet.isEsterilizado = this.propuesta.is_esterilizado;
  }

  async aceptarPropuesta() {
    await this.alertaService.presentLoading('Aceptando Propuesta');
    try {
      this.send.estado = 'A';
      await this.administrador.adminMascota.actualizarSolicitud(this.send);
      this.navCtrl.pop();
      await this.alertaService.presentToast('La propuesta fue aceptada');
    } catch (err) {
      this.alertaService.presentToast('Error al aceptar propuesta, por favor intente de nuevo' + err);
      console.log(err);
    }
    this.alertaService.dismissLoading();
  }

  async rechazarPropuesta() {
    await this.alertaService.presentLoading('Rechazando Propuesta');
    try {
      this.send.estado = 'R';
      await this.administrador.adminMascota.actualizarSolicitud(this.send);
      this.navCtrl.pop();
      await this.alertaService.presentToast('La propuesta fue rechazada');
    } catch (err) {
      this.alertaService.presentToast('Error al rechazar propuesta' + ', por favor intente de nuevo' + err);
    }
    this.alertaService.dismissLoading();
  }
}
