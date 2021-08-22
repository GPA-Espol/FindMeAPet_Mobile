import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { SpecificUserPage } from './specific-user.page';

describe('SpecificUserPage', () => {
  let component: SpecificUserPage;
  let fixture: ComponentFixture<SpecificUserPage>;

  beforeEach(
    waitForAsync(() => {
      const id = 4;
      const navCtrlSpy = jasmine.createSpyObj('NavController', ['pop']);
      const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
      TestBed.configureTestingModule({
        declarations: [SpecificUserPage],
        imports: [IonicModule.forRoot(), PipesModule],
        providers: [
          { provide: ActivatedRoute, useValue: buildActivatedRoute(id) },
          { provide: SistemaService, useValue: buildSistemaService() },
          { provide: NavController, useValue: navCtrlSpy },
          { provide: Router, useValue: routerSpy },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SpecificUserPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function buildActivatedRoute(id: number) {
  return {
    snapshot: { paramMap: { get: (_) => id } },
  };
}

function buildSistemaService() {
  return {
    admin: {
      adminUsuario: {
        obtenerUsuarioPorId: (id: number) => {},
      },
    },
  };
}
