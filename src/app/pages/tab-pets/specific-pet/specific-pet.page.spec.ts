import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { RolUsuario, UbicacionMascota } from 'src/app/model/enums.model';
import { Mascota } from 'src/app/model/mascota.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { SpecificPetPage } from './specific-pet.page';

describe('SpecificPetPage', () => {
  let component: SpecificPetPage;
  let fixture: ComponentFixture<SpecificPetPage>;
  beforeEach(
    waitForAsync(() => {
      const navCtrlSpy = jasmine.createSpyObj('NavController', ['pop']);
      TestBed.configureTestingModule({
        declarations: [SpecificPetPage],
        imports: [IonicModule.forRoot()],
        providers: [
          { provide: SistemaService, useValue: createSistemaService() },
          { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1 } } } },
          { provide: NavController, useValue: navCtrlSpy },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SpecificPetPage);
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
    mascotas: [createTestPet()],
    admin: new Administrador(),
    userLoggedIn: () => {
      return { rol: RolUsuario.ADMIN };
    },
  };
}
