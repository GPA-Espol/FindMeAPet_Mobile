import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolUsuario } from 'src/app/model/enums.model';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';


/**
 * Class in charge of the behaviour of the Login Page.
 * @category Components
 */
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

  /**
   * Initializes the login form Group with the fields of user and password,
   * both of them as required.
   */
  initForm() {
    this._loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Log the user in getting the user and password value from the login form group
   * and calling the {@link SistemaService#login}.
   * If authenticated correctly, redirect the user to the Home page of the app.
   * If not, presenting a toast to the user pointing that user or password was incorrect
   */
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
      await this.alertaService.presentToast('Usuario o contraseña incorrectas');
    }
    this.alertaService.dismissLoading();
  }

  /**
   * get the Login form grout
   * @returns {FormGroup} The form group of the page
   */
  public get loginForm() {
    return this._loginForm;
  }
}
