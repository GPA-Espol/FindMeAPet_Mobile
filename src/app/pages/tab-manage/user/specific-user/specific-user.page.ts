import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { UserService } from 'src/app/observables/user.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-specific-user',
  templateUrl: './specific-user.page.html',
  styleUrls: ['./specific-user.page.scss'],
})
export class SpecificUserPage implements OnInit {
  user: any;
  isAdmin: boolean;
  loading = true;
  userSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private sistema: SistemaService,
    private alertaService: AlertaService,
    private navCtrl: NavController,
    private router: Router,
    private userObserver: UserService
  ) {}

  async ngOnInit() {
    await this.getUserData();
    this.userSubscription = this.userObserver.getObservable().subscribe(async () => {
      this.loading = true;
      await this.getUserData();
      this.loading = false;
    });
    this.loading = false;
  }

  private async getUserData() {
    const id = +this.route.snapshot.paramMap.get('id');
    const { adminUsuario } = this.sistema.admin;
    this.user = await adminUsuario.obtenerUsuarioPorId(id);
    this.isAdmin = this.user instanceof Administrador;
  }

  /**
   * Method that displays the modal when pressing the delete button, to ask for confirmation
   */
  async modaDelete() {
    const message = 'El usuario se eliminará permanentemente';
    await this.alertaService.confirmationAlert(message, this.deleteUser.bind(this));
  }

  async deleteUser() {
    await this.alertaService.presentLoading('Eliminando...');
    const { adminUsuario, id } = this.sistema.admin;
    await adminUsuario.eliminarUsuario(this.user.id);
    if (this.user.id === id) {
      this.alertaService.dismissLoading();
      this.sistema.logout();
      this.router.navigateByUrl('/', { replaceUrl: true });
      return this.alertaService.presentToast('Su usuario ha sido eliminado');
    }
    this.userObserver.publish();
    this.navCtrl.pop();
    this.alertaService.dismissLoading();
    await this.alertaService.presentToast('El usuario ha sido eliminado');
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
