import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { UbicacionMascota } from 'src/app/model/enums.model';
import { Mascota } from 'src/app/model/mascota.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { VolunteerRequestPage } from './volunteer-request.page';

describe('VolunteerRequestPage', () => {
  let component: VolunteerRequestPage;
  let fixture: ComponentFixture<VolunteerRequestPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VolunteerRequestPage],
        imports: [IonicModule.forRoot(), AppRoutingModule, ComponentsModule],
        providers: [{ provide: SistemaService, useValue: createSistemaService() }],
      }).compileComponents();

      fixture = TestBed.createComponent(VolunteerRequestPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

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

function createSistemaService() {
  return {
    admin: {
      adminMascota: {
        verPropuestasVoluntarios: () => [],
      },
    },
  };
}
