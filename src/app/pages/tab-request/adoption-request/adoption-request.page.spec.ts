import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { AdoptionRequestPage } from './adoption-request.page';

describe('AdoptionRequestPage', () => {
  let component: AdoptionRequestPage;
  let fixture: ComponentFixture<AdoptionRequestPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AdoptionRequestPage],
        imports: [IonicModule.forRoot(), AppRoutingModule, PipesModule],
        providers: [{ provide: SistemaService, useValue: buildSistemaService() }],
      }).compileComponents();

      fixture = TestBed.createComponent(AdoptionRequestPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function buildSistemaService() {
  return {
    admin: {
      adminFormulario: {
        revisarFormularios: () => [],
      },
    },
    getMascotabyId: (_) => {},
  };
}
