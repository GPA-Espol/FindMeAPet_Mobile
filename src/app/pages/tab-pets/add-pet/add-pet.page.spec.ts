import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActionSheetController, IonicModule, NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AddPetPage } from './add-pet.page';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Mascota } from 'src/app/model/mascota.model';
import { RolUsuario, UbicacionMascota } from 'src/app/model/enums.model';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { AdministrarMascota } from 'src/app/model/admin/mascota_admin.model';

describe('AddPetPage', () => {
  let component: AddPetPage;
  let fixture: ComponentFixture<AddPetPage>;
  let adminMascotaSpy: AdministrarMascota;
  let system: SistemaService;
  let camera: Camera;
  let actionSheetElementSpy: HTMLIonActionSheetElement;
  beforeEach(
    waitForAsync(() => {
      const alertServiceSpy = jasmine.createSpyObj('AlertService', [
        'presentToast',
        'presentLoading',
        'dismissLoading',
      ]);
      adminMascotaSpy = jasmine.createSpyObj('AdministrarMascota', ['crearMascota']);
      const adminSpy = jasmine.createSpyObj('Administrador', [], { adminMascota: adminMascotaSpy });
      const systemSpy = jasmine.createSpyObj(
        'SistemaService',
        {
          userLoggedIn: () => {
            return {
              id: 5,
              rol: RolUsuario.ADMIN,
              token: 'token',
            };
          },
          getMascotabyId: createTestPet(),
        },
        {
          admin: adminSpy,
        }
      );
      const cameraSpy = createCameraSpy();
      const navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateBack']);
      actionSheetElementSpy = jasmine.createSpyObj('HTMLIonActionSheetElement', ['present']);
      const actionSheetController = jasmine.createSpyObj('ActionSheetController', {
        create: actionSheetElementSpy,
      });
      TestBed.configureTestingModule({
        declarations: [AddPetPage],
        imports: [
          IonicModule.forRoot(),
          HttpClientTestingModule,
          IonicStorageModule.forRoot(),
          AppRoutingModule,
          ReactiveFormsModule,
        ],
        providers: [
          { provide: Camera, useValue: cameraSpy },
          { provide: AngularFireStorage, useValue: createAngularFireStorageSpy() },
          { provide: AlertaService, useValue: alertServiceSpy },
          { provide: SistemaService, useValue: systemSpy },
          { provide: ActionSheetController, useValue: actionSheetController },
          { provide: NavController, useValue: navCtrlSpy },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AddPetPage);
      system = TestBed.inject(SistemaService);
      camera = TestBed.inject(Camera);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('APP-01 should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('APP-02 Should create a pet', async () => {
    component.image64 = 'abc,abc';
    createPetForm(component.mascota);
    await component.onSubmit();
    const createPetSpy = adminMascotaSpy.crearMascota as jasmine.Spy;
    const petSpy = createPetSpy.calls.first().args[0] as Mascota;
    const petTest = createTestPet();
    expect(petSpy.nombre).toEqual(petTest.nombre);
    expect(petSpy.color).toEqual(petTest.color);
    expect(petSpy.ubicacionMascota).toEqual(petTest.ubicacionMascota);
    expect(petSpy.descripcion).toEqual(petTest.descripcion);
    expect(petSpy.sexo).toEqual(petTest.sexo);
    expect(petSpy.tipoAnimal).toEqual(petTest.tipoAnimal);
  });

  it('APP-03 Should take a photo', () => {
    component.takePicture(1);
    const getPictureSpy = camera.getPicture as jasmine.Spy;
    expect(getPictureSpy.calls.count()).toBe(1);
  });

  it('APP-04 should show action sheet to choose a way to take the photo', async () => {
    await component.selectImage();
    const presentSpy = actionSheetElementSpy.present as jasmine.Spy;
    expect(presentSpy.calls.count()).toBe(1);
  });*/
});

function createAngularFireStorageSpy() {
  const angularFireStorageRef = jasmine.createSpyObj('AngularFireStorageReference', {
    getDownloadURL: new Observable((observer: Observer<string>) => {
      observer.next('www');
      observer.complete();
    }),
  });
  const angularFireUploadTask = jasmine.createSpyObj('AngularFireUploadTask', {
    snapshotChanges: new Observable((observer: Observer<any>) => {
      observer.complete();
    }),
  });
  const angularFireStorage = jasmine.createSpyObj('AngularFireStorage', {
    ref: angularFireStorageRef,
    upload: angularFireUploadTask,
  });
  return angularFireStorage;
}

function createCameraSpy() {
  return jasmine.createSpyObj(
    'Camera',
    {
      getPicture: new Promise((resolve) => {
        resolve('abc,abc');
      }),
    },
    { DestinationType: {}, EncodingType: {}, MediaType: {} }
  );
}
function createPetForm(form: FormGroup) {
  const testPet = createTestPet();
  form.setValue({
    nombre: testPet.nombre,
    color: testPet.color,
    esterilizado: testPet.isEsterilizado ? 1 : 0,
    adoptado: testPet.isAdoptado ? 1 : 0,
    caso_externo: testPet.isCasoExterno ? 1 : 0,
    adoptable: testPet.isAdoptable ? 1 : 0,
    descripcion: testPet.descripcion,
    sexo: testPet.sexo,
    ubicacion: testPet.ubicacionMascota,
    tipo: testPet.tipoAnimal,
    years: '0',
    months: '1',
    days: '0',
    image: 'www',
  });
}

function createTestPet() {
  let testPet = new Mascota();
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
