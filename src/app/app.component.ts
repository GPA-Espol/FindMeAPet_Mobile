import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SistemaService } from './services/sistema/sistema.service';
import { RolUsuario } from './model/enums.model';
import { IonMenu, Platform } from '@ionic/angular';

/**
 * App component
 * @category Components
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild('menu') ionMenu: IonMenu;
  constructor(
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private router: Router,
    private sistema: SistemaService,
    private platform: Platform
  ) {
    this.initializeApp();
  }

  /**
   * Handle some initialization tasks of the app, like setting the backgroundcolor, hide
   * the splashscreen, and redirecting the user to home if has already logged in.
   */
  async initializeApp() {
    if (environment.version != 'web') {
      this.platform.ready().then(() => {
        this.statusBar.backgroundColorByHexString('#ec823a');
        this.splashScreen.hide();
      });
    }
    let userLoggedIn = await this.sistema.userLoggedIn();
    if (userLoggedIn) {
      if (userLoggedIn.rol == RolUsuario.ADMIN) {
        this.sistema.crearUsuario();
        this.router.navigateByUrl('/tabs/admin', { replaceUrl: true });
      } else if (userLoggedIn.rol == RolUsuario.VOLUNTARIO) {
        this.sistema.crearUsuario();
        this.router.navigateByUrl('/tabs/voluntario', { replaceUrl: true });
      }
    }
  }

  /**
   * Logs out the session, redirect the user to the login, and clean the userdata from
   * the system.
   */
  public async cerrarSesion() {
    this.router.navigateByUrl('/', { replaceUrl: true });
    await this.sistema.logout();
    this.ionMenu.close(true);
  }
}
