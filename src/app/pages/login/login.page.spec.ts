import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { Storage } from '@ionic/storage';
import { LoginPage } from './login.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let storage: Storage;
  let router: Router;
  let alertaService: AlertaService;
  beforeEach(
    waitForAsync(async () => {
      let storageService = new Storage();
      storage = await storageService.create();
      const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
      const alertServiceSpy = jasmine.createSpyObj('AlertService', [
        'presentToast',
        'presentLoading',
        'dismissLoading',
      ]);
      TestBed.configureTestingModule({
        declarations: [LoginPage],
        imports: [
          IonicModule.forRoot(),
          HttpClientModule,
          IonicStorageModule.forRoot(),
          AppRoutingModule,
          FormsModule,
          ReactiveFormsModule,
        ],
        providers: [
          { provide: SistemaService, useValue: buildStub(storage) },
          { provide: Router, useValue: routerSpy },
          { provide: AlertaService, useValue: alertServiceSpy },
          FirebaseX,
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(LoginPage);
      router = TestBed.inject(Router);
      alertaService = TestBed.inject(AlertaService);
      component = fixture.componentInstance;
      component.ngOnInit();
      fixture.detectChanges();
    })
  );

  it('LP-01 should create', () => {
    expect(component).toBeTruthy();
  });

  it('LP-02 Should login and redirect to /tabs/admin', async () => {
    component.loginForm.setValue({ user: 'admin', password: 'admin' });
    fixture.detectChanges();
    await component.iniciarSesion();
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/tabs/admin');
  });

  it('LP-03 Should login and redirect to /tabs/voluntario', async () => {
    component.loginForm.setValue({ user: 'voluntario', password: 'voluntario' });
    fixture.detectChanges();
    await component.iniciarSesion();
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/tabs/voluntario');
  });

  it("LP-04 Shouldn't login and shouldn't redirect to", async () => {
    component.loginForm.setValue({ user: 'voluntario', password: 'admin' });
    fixture.detectChanges();
    await component.iniciarSesion();
    fixture.detectChanges();
    const presentToastSpy = alertaService.presentToast as jasmine.Spy;
    const presentToastArgsSpy = presentToastSpy.calls.first().args[0];
    expect(presentToastArgsSpy).toContain('Usuario o contraseña incorrectas');
    const spy = router.navigateByUrl as jasmine.Spy;
    expect(spy.calls.count()).toBe(0);
  });
});

function buildStub(storage) {
  return {
    usuario: '',
    password: '',
    login: async (user: string, password: string) => {
      await storage.set('test_user', user);
      await storage.set('test_password', password);
    },
    userLoggedIn: async () => {
      let user = await storage.get('test_user');
      let password = await storage.get('test_password');
      await storage.remove('test_user');
      await storage.remove('test_password');
      if (user == 'admin' && password == 'admin') {
        return { token: 'abcd', rol: 'Admin' };
      } else if (user == 'voluntario' && password == 'voluntario') {
        return { token: 'abcd', rol: 'Voluntario' };
      }
      throw 'err;';
    },
  };
}
