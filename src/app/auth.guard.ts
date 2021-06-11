import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RolUsuario } from './model/enums.model';
import { SistemaService } from './services/sistema.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router, private sistema: SistemaService) {}

  async canActivate() {
    if (await this.sistema.userLoggedIn()) {
      return true;
    }
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthAdminGuard implements CanActivate {
  constructor(private router: Router, private sistema: SistemaService) {}

  async canActivate() {
    let userLoggedIn = await this.sistema.userLoggedIn();
    if (userLoggedIn && userLoggedIn.rol == RolUsuario.ADMIN) {
      return true;
    }
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthVoluntarioGuard implements CanActivate {
  constructor(private router: Router, private sistema: SistemaService) {}

  async canActivate() {
    let userLoggedIn = await this.sistema.userLoggedIn();
    if (userLoggedIn && userLoggedIn.rol == RolUsuario.VOLUNTARIO) {
      return true;
    }
    this.router.navigateByUrl('/', { replaceUrl: true });
  }
}
