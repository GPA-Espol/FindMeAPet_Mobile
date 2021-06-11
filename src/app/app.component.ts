import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SistemaService } from './services/sistema.service';
import { RolUsuario } from './model/enums.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private router: Router,
    private sistema: SistemaService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    if (environment.version != 'web') {
      this.statusBar.backgroundColorByHexString('#EC823A');
      this.splashScreen.hide();
    }
    let userLoggedIn = await this.sistema.userLoggedIn();
    if (userLoggedIn) {
      if (userLoggedIn.rol == RolUsuario.ADMIN) {
        this.router.navigateByUrl('/tabs/admin', { replaceUrl: true });
      } else {
        this.router.navigateByUrl('/tabs/voluntario', { replaceUrl: true });
      }
    }
  }

  public async cerrarSesion() {
    await this.sistema.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
