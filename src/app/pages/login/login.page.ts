import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonGrid } from '@ionic/angular';
import { AlertaService } from 'src/app/services/alerta.service';
import { SistemaService } from 'src/app/services/sistema.service';

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
  loginForm: FormGroup;
  userType: UserType = UserType.Volunteer;
  otherUserType: UserType = UserType.Admin;
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
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async iniciarSesion() {
    const usuario = this.loginForm.get('user').value;
    const contraseña = this.loginForm.get('password').value;
    await this.alertaService.presentLoading('Iniciando sesión...');
    await this.sistema.login(usuario, contraseña);
    this.router.navigateByUrl('/tabs', { replaceUrl: true });
    this.alertaService.dismissLoading();
  }
}
