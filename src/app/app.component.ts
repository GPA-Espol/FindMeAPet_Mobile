import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { SistemaService } from './services/sistema.service';

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

  initializeApp() {
    if (environment.version != 'web') {
      this.statusBar.backgroundColorByHexString('#EC823A');
      this.splashScreen.hide();
    }
  
  }

  public async cerrarSesion() {
    await this.sistema.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
