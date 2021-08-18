import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { PublicationPage } from './publication.page';

describe('PublicationPage', () => {
  let component: PublicationPage;
  let fixture: ComponentFixture<PublicationPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PublicationPage],
        imports: [IonicModule.forRoot(), AppRoutingModule],
        providers: [{ provide: SistemaService, useValue: buildSistemaService() }],
      }).compileComponents();

      fixture = TestBed.createComponent(PublicationPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function buildRouterMock() {
  return {
    url: '/tabs/admin/configuracion/Noticia',
  };
}

function buildSistemaService() {
  return {
    admin: {
      adminPublicacion: {
        verPublicaciones: () => [],
      },
    },
  };
}
