import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SistemaService } from './sistema.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { RolUsuario } from 'src/app/model/enums.model';

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

  it('SS-01 should be created', () => {
    expect(service).toBeTruthy();
  });

  it('SS-02 should check that user is not logged In', async () => {
    await storage.remove('usuario');
    expect(await service.userLoggedIn()).toBeFalsy();
  });

  it('SS-03 should log in as admin', (done) => {
    let token = 'abcd';
    let rol = RolUsuario.ADMIN;
    let usuario = 'admin';
    let password = 'admin';

    service.login(usuario, password).then(async () => {
      let userLogged = await service.userLoggedIn();
      expect(userLogged).toEqual({ token, rol, id:5 });
      expect(service.admin).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne(`${environment.api}auth`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ usuario, password });
    req.flush({ token, rol, id: 1 });
  });

  it('SS-04 should check that user is logged In', async () => {
    expect(await service.userLoggedIn()).toBeTruthy();
  });

  it('SS-05 should log out from admin', async () => {
    await service.logout();
    let userLogged = await storage.get('usuario');
    expect(userLogged).toBeFalsy();
    expect(service.admin).toBeFalsy();
  });

  it('SS-06 should log in as volunteer', (done) => {
    let token = 'abcd';
    let rol = RolUsuario.VOLUNTARIO;
    let usuario = 'voluntario';
    let password = 'voluntario';
    service.login(usuario, password).then(async () => {
      let userLogged = await service.userLoggedIn();
      expect(userLogged).toEqual({ rol, token, id:5 });
      expect(service.voluntario).toBeTruthy();
      done();
    });

    const req = httpMock.expectOne(`${environment.api}auth`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ usuario, password });
    req.flush({ token, rol, id: 1 });
  });

  it('SS-07 should log out from volunteer', async () => {
    await service.logout();
    let userLogged = await storage.get('usuario');
    expect(userLogged).toBeFalsy();
    expect(service.voluntario).toBeFalsy();
  });

  it('SS-08 should check that user is not logged In', async () => {
    expect(await service.userLoggedIn()).toBeFalsy();
  });

  it("SS-09 shouldn't log in, unauthorized", (done) => {
    service
      .login('admin', '1234')
      .then(() => {})
      .catch(async (err) => {
        expect(err).toBeTruthy();
        let userLogged = await storage.get('usuario');
        expect(userLogged).toBeFalsy();
        expect(service.voluntario).toBeFalsy();
        done();
      });

    const req = httpMock.expectOne(`${environment.api}auth`);
    req.error(new ErrorEvent('Unauthorized'));
  });

  afterEach(() => {
    httpMock.verify();
  });
});
