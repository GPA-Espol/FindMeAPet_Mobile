import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { UbicacionMascota } from 'src/app/model/enums.model';
import { Mascota } from 'src/app/model/mascota.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { SpecificVolunteerRequestPage } from './specific-volunteer-request.page';

describe('SpecificVolunteerRequestPage', () => {
  let component: SpecificVolunteerRequestPage;
  let fixture: ComponentFixture<SpecificVolunteerRequestPage>;

  beforeEach(
    waitForAsync(() => {
      const navCtrlSpy = jasmine.createSpyObj('NavController', ['pop']);
      TestBed.configureTestingModule({
        declarations: [SpecificVolunteerRequestPage],
        imports: [IonicModule.forRoot(), ComponentsModule],
        providers: [
          { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
          { provide: SistemaService, useFactory: buildSistemaService },
          { provide: NavController, useValue: navCtrlSpy },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SpecificVolunteerRequestPage);
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
      adminMascota: {
        verPropuestasVoluntarioById: () => {
          return {};
        },
      },
    },
  };
}
function createTestPet() {
  let testPet = new Mascota();
  testPet.id = 1;
  testPet.nombre = 'Diego';
  testPet.color = 'Blanco';
  testPet.isEsterilizado = true;
  testPet.isAdoptado = false;
  testPet.isCasoExterno = false;
  testPet.isAdoptable = true;
  testPet.descripcion = 'Usa arenero.';
  testPet.sexo = 'M';
  testPet.ubicacionMascota = UbicacionMascota.ASO_FIMCP;
  testPet.tipoAnimal = 'Gato';
  testPet.fechaNacimiento = new Date();
  return testPet;
}
