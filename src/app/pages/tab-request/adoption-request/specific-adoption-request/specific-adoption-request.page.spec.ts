import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { SpecificAdoptionRequestPage } from './specific-adoption-request.page';

describe('SpecificAdoptionRequestPage', () => {
  let component: SpecificAdoptionRequestPage;
  let fixture: ComponentFixture<SpecificAdoptionRequestPage>;

  beforeEach(
    waitForAsync(() => {
      const id = 5;
      const navCtrlSpy = jasmine.createSpyObj('NavController', ['pop']);
      TestBed.configureTestingModule({
        declarations: [SpecificAdoptionRequestPage],
        imports: [IonicModule.forRoot()],
        providers: [
          { provide: ActivatedRoute, useValue: buildActivatedRoute(id) },
          { provide: NavController, useValue: navCtrlSpy },
          { provide: SistemaService, useValue: buildSistemaService() },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SpecificAdoptionRequestPage);
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
      adminFormulario: {
        responderFormularioAdopcion: () => {},
      },
    },
  };
}
