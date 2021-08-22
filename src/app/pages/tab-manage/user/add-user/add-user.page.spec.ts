import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { AddUserPage } from './add-user.page';

describe('AddUserPage', () => {
  let component: AddUserPage;
  let fixture: ComponentFixture<AddUserPage>;

  beforeEach(
    waitForAsync(() => {
      const navCtrlSpy = jasmine.createSpyObj('NavController', ['pop']);
      const id = 5;
      TestBed.configureTestingModule({
        declarations: [AddUserPage],
        imports: [IonicModule.forRoot(), ReactiveFormsModule, ComponentsModule],
        providers: [
          { provide: Router, useValue: buildRouter() },
          { provide: NavController, useValue: navCtrlSpy },
          { provide: ActivatedRoute, useValue: buildActivatedRoute(id) },
          { provide: SistemaService, useValue: buildSistemaService() },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AddUserPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function buildRouter() {
  return {
    url: '/tabs/admin/configuracion/Usuario/anadir',
  };
}

function buildActivatedRoute(id: number) {
  return {
    snapshot: { paramMap: { get: (_) => id } },
  };
}

function buildSistemaService() {
  return {
    admin: {
      adminUsuario: {
        agregarAdministrador: () => {},
        actualizarAdministrador: () => {},
        agregarVoluntario: () => {},
        actualizarVoluntario: () => {},
        obtenerUsuarioPorId: () => {},
      },
    },
  };
}
