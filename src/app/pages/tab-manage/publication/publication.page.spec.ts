import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subject } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TipoPublicacion } from 'src/app/model/enums.model';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PublicationObserverService } from 'src/app/observables/publication-observer.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { PublicationPage } from './publication.page';

describe('PublicationPage', () => {
  let component: PublicationPage;
  let fixture: ComponentFixture<PublicationPage>;
  let router: any;
  let observer = new Subject();
  let sistema: any;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PublicationPage],
        imports: [IonicModule.forRoot(), AppRoutingModule],
        providers: [
          { provide: SistemaService, useValue: buildSistemaService() },
          { provide: Router, useValue: buildRouterMock() },
          {
            provide: PublicationObserverService,
            useValue: {
              getObservable: () => observer,
            },
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(PublicationPage);
      router = TestBed.inject(Router);
      sistema = TestBed.inject(SistemaService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('PPC-01 should create', () => {
    expect(component).toBeTruthy();
  });

  it('PPC-02 Should set Noticia as publication type', () => {
    router.url = '/tabs/admin/configuracion/' + TipoPublicacion.NOTICIA;
    component.ngOnInit();
    expect(component.publicationsType).toEqual(TipoPublicacion.NOTICIA);
  });

  it('PPC-03 Should set Evento as publication type', () => {
    router.url = '/tabs/admin/configuracion/' + TipoPublicacion.EVENTO;
    component.ngOnInit();
    expect(component.publicationsType).toEqual(TipoPublicacion.EVENTO);
  });

  it('PPC-04 Should set "noticias" as publication title', () => {
    router.url = '/tabs/admin/configuracion/' + TipoPublicacion.NOTICIA;
    component.ngOnInit();
    expect(component.publicationTitle).toEqual('noticias');
  });

  it('PPC-05 Should set "eventos" as publication title', () => {
    router.url = '/tabs/admin/configuracion/' + TipoPublicacion.EVENTO;
    component.ngOnInit();
    expect(component.publicationTitle).toEqual('eventos');
  });

  it('PPC-06 Should set only publications of type "noticia" as data', async () => {
    router.url = '/tabs/admin/configuracion/' + TipoPublicacion.NOTICIA;
    await component.ngOnInit();
    expect(component.publications.length).toBe(2);
  });

  it('PPC-07 Should set only publications of type "evento" as data', async () => {
    router.url = '/tabs/admin/configuracion/' + TipoPublicacion.EVENTO;
    await component.ngOnInit();
    expect(component.publications.length).toBe(0);
  });

  it('PPC-08 Should update publications on observable next call', (done) => {
    router.url = '/tabs/admin/configuracion/' + TipoPublicacion.EVENTO;
    component.ngOnInit().then(() => {
      const newPub = new Publicacion();
      newPub.tipo = TipoPublicacion.EVENTO;
      sistema.admin.adminPublicacion.verPublicaciones().push(newPub);
      observer.next();
      setTimeout(() => {
        expect(component.publications.length).toBe(1);
        done();
      }, 100); // this is needed to wait for async
    });
  });
});

function buildRouterMock() {
  return {
    url: '/tabs/admin/configuracion/Noticia',
    events: {
      subscribe: () => {},
    },
  };
}

const publicacionNoticia1 = new Publicacion();
publicacionNoticia1.tipo = TipoPublicacion.NOTICIA;
const publicacionNoticia2 = new Publicacion();
publicacionNoticia2.tipo = TipoPublicacion.NOTICIA;
const publications = [publicacionNoticia1, publicacionNoticia2];
function buildSistemaService() {
  return {
    admin: {
      adminPublicacion: {
        verPublicaciones: () => publications,
      },
    },
  };
}
