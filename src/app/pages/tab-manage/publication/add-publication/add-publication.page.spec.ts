import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { Mode } from 'src/app/utils/utils';

import { AddPublicationPage } from './add-publication.page';

describe('AddPublicationPage', () => {
  let component: AddPublicationPage;
  let fixture: ComponentFixture<AddPublicationPage>;
  const baseUrl = '/tabs/admin/configuracion/';

  beforeEach(
    waitForAsync(() => {
      const navCtrlSpy = jasmine.createSpyObj('NavController', ['pop']);
      TestBed.configureTestingModule({
        declarations: [AddPublicationPage],
        imports: [IonicModule.forRoot(), ReactiveFormsModule, ComponentsModule],
        providers: [
          { provide: SistemaService, useValue: buildSistemaService() },
          { provide: Router, useValue: buildRouterMock() },
          { provide: NavController, useValue: navCtrlSpy },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AddPublicationPage);
      component = fixture.componentInstance;
      component.mode = Mode.ANADIR;
      component.ngOnInit();
      fixture.detectChanges();
    })
  );

  it('APC-01 Should create', () => {
    expect(component).toBeTruthy();
  });
});

function buildSistemaService() {
  return {
    admin: {
      adminPublicacion: {
        verPublicaciones: () => [],
      },
    },
  };
}

function buildRouterMock() {
  return {
    url: '/tabs/admin/configuracion/Noticia/anadir',
  };
}
