import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { UbicacionMascota } from 'src/app/model/enums.model';
import { Mascota } from 'src/app/model/mascota.model';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { TabPetsPage } from './tab-pets.page';

describe('TabPetsPage', () => {
  let component: TabPetsPage;
  let fixture: ComponentFixture<TabPetsPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TabPetsPage],
        imports: [
          IonicModule.forRoot(),
          PipesModule,
          AppRoutingModule,
          HttpClientModule,
          IonicStorageModule.forRoot(),
          PipesModule,
          ComponentsModule,
        ],
        providers: [FirebaseX, { provide: SistemaService, useValue: createSistemaService() }],
      }).compileComponents();

      fixture = TestBed.createComponent(TabPetsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('TB-01 should create', () => {
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
    getMascotas: () => [createTestPet()],
  };
}
