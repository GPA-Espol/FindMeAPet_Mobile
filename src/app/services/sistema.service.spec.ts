import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SistemaService } from './sistema.service';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

describe('SistemaService', () => {
  let service: SistemaService;
  let storage: Storage;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    let StorageService = new Storage();
    storage = await StorageService.create();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, IonicStorageModule.forRoot()],
    });
    service = TestBed.inject(SistemaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should check that user is not logged In', async () => {
    expect(await service.userLoggedIn()).toBeFalsy();
  });

  it('should log in as admin', (done) => {
    let token = 'abcd';
    let rol = 'Admin';
    let usuario = 'admin';
    let password = 'admin';

    service.login('admin', 'admin').then(async (result: any) => {
      expect(result).toBe(rol);
      let userLogged = await storage.get('usuario');
      expect(userLogged).toEqual({ token, rol });
      expect(service.admin).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne(`${environment.api}auth`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ usuario, password });
    req.flush({ token, rol, id: 1 });
  });

  it('Should check that user is logged In', async () => {
    expect(await service.userLoggedIn()).toBeTruthy();
  });

  it('Should log out from admin', async () => {
    await service.logout();
    let userLogged = await storage.get('usuario');
    expect(userLogged).toBeFalsy();
    expect(service.admin).toBeFalsy();
  });

  it('should log in as volunteer', (done) => {
    let token = 'abcd';
    let rol = 'Voluntario';
    let usuario = 'voluntario';
    let password = 'voluntario';
    service.login(usuario, password).then(async (result: any) => {
      expect(result).toBe(rol);
      let userLogged = await storage.get('usuario');
      expect(userLogged).toEqual({ token, rol });
      expect(service.voluntario).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne(`${environment.api}auth`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ usuario, password });
    req.flush({ token, rol, id: 1 });
  });

  it('Should log out from volunteer', async () => {
    await service.logout();
    let userLogged = await storage.get('usuario');
    expect(userLogged).toBeFalsy();
    expect(service.voluntario).toBeFalsy();
  });

  it('Should check that user is not logged In', async () => {
    expect(await service.userLoggedIn()).toBeFalsy();
  });

  it('Should get pets info', () => {});

  afterEach(() => {
    httpMock.verify();
  });
});
