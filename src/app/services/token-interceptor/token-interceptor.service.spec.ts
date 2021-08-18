import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SistemaService } from '../sistema/sistema.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Storage } from '@ionic/storage';

import { TokenInterceptorService } from './token-interceptor.service';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

describe('TokenInterceptorService', () => {
  let httpMock: HttpTestingController;
  let sistema: SistemaService;
  let storage: Storage;

  beforeEach(async () => {
    let StorageService = new Storage();
    storage = await StorageService.create();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, IonicStorageModule.forRoot()],
      providers: [
        SistemaService,
        FirebaseX,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true,
        },
      ],
    });
    sistema = TestBed.inject(SistemaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('TI-01 should intercept and add the authorization header in the form "Bearer token"', (done) => {
    let token = 'abcd';
    let rol = 'Admin';
    storage.set('usuario', { token, rol }).then(() => {
      sistema.getMascotas(true).then((result) => {
        expect(result).toEqual([]);
        done();
      });

      setTimeout(() => {
        const req = httpMock.expectOne(`${environment.api}mascota`);
        let authorization = req.request.headers.get('Authorization');
        expect(authorization).toBe(`Bearer ${token}`);
        req.flush([]);
        storage.remove('usuario');
      }, 100); // Wait until interceptor has done his work
    });
  });

  it('TI-02 should not add the authorization header since it is not logged in', (done) => {
    storage.remove('usuario').then(() => {
      sistema.getMascotas(true).then((result) => {
        expect(result).toEqual([]);
        done();
      });

      setTimeout(() => {
        const req = httpMock.expectOne(`${environment.api}mascota`);
        let authorization = req.request.headers.get('Authorization');
        expect(authorization).toBeFalsy();
        req.flush([]);
      }, 100); //Wait until interceptor has done his work
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
