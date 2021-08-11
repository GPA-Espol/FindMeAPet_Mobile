import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-specific-adoption-request',
  templateUrl: './specific-adoption-request.page.html',
  styleUrls: ['./specific-adoption-request.page.scss'],
})
export class SpecificAdoptionRequestPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private alertaService: AlertaService,
    private sistema: SistemaService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    const idAdoptReq = +this.route.snapshot.paramMap.get('id');
  }

  async acept() {
    await this.alertaService.presentLoading('Aceptando...');
    const { adminFormulario } = this.sistema.admin;
    window.open(
      'https://api.whatsapp.com/send?phone=593993068319&text=I%20want%20to%20find%20out%20about%20your%20products'
    );
    await adminFormulario.responderFormularioAdopcion(1, true);
    this.goback();
    this.alertaService.dismissLoading();
  }

  async reject() {
    await this.alertaService.presentLoading('Rechazando...');
    const { adminFormulario } = this.sistema.admin;
    await adminFormulario.responderFormularioAdopcion(1, false);
    this.goback();
    this.alertaService.dismissLoading();
  }

  /**
   * Method that navigate to the home page with a go back animation
   */
  goback() {
    this.navCtrl.pop();
  }
}
