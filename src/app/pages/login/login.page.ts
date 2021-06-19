import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonGrid } from '@ionic/angular';
import { RolUsuario } from 'src/app/model/enums.model';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

enum UserType {
  Volunteer = 'Voluntario',
  Admin = 'Administrador',
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private _loginForm: FormGroup;
  @ViewChild('separator') separator: ElementRef;
  @ViewChild('content') content: ElementRef;
  constructor(
    private sistema: SistemaService,
    private alertaService: AlertaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this._loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async iniciarSesion() {
    const usuario = this._loginForm.get('user').value;
    const password = this._loginForm.get('password').value;
    await this.alertaService.presentLoading('Iniciando sesión...');
    try {
      await this.sistema.login(usuario, password);
      let { rol } = await this.sistema.userLoggedIn();
      if (rol == RolUsuario.ADMIN) {
        this.router.navigateByUrl('/tabs/admin', { replaceUrl: true });
      } else {
        this.router.navigateByUrl('/tabs/voluntario', { replaceUrl: true });
      }
    } catch (err) {
      console.error('Error al iniciar sesion: ', err);
      this.alertaService.presentToast('Usuario o contraseña incorrectas');
    }
    this.alertaService.dismissLoading();
  }

  public get loginForm() {
    return this._loginForm;
  }
}
