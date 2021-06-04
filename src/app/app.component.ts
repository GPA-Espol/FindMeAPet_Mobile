import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    if (environment.version != 'web') {
      this.statusBar.backgroundColorByHexString('#EC823A');
      this.splashScreen.hide();
    }
  }
}
