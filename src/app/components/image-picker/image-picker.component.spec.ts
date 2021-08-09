import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActionSheetController, IonicModule, NavController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AdministrarMascota } from 'src/app/model/admin/mascota_admin.model';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
import { Camera } from '@ionic-native/camera/ngx';

import { ImagePickerComponent } from './image-picker.component';
import { Observable, Observer } from 'rxjs';
import { Mascota } from 'src/app/model/mascota.model';
import { UbicacionMascota } from 'src/app/model/enums.model';

const photoUrl = 'www';

describe('ImagePickerComponent', () => {
  let component: ImagePickerComponent;
  let fixture: ComponentFixture<ImagePickerComponent>;
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
      const systemSpy = jasmine.createSpyObj('SistemaService', [], { admin: adminSpy });
      const cameraSpy = createCameraSpy();
      const navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateBack']);
      actionSheetElementSpy = jasmine.createSpyObj('HTMLIonActionSheetElement', ['present']);
      const actionSheetController = jasmine.createSpyObj('ActionSheetController', {
        create: actionSheetElementSpy,
      });
      TestBed.configureTestingModule({
        declarations: [ImagePickerComponent],
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
      fixture = TestBed.createComponent(ImagePickerComponent);
      component = fixture.componentInstance;
      system = TestBed.inject(SistemaService);
      camera = TestBed.inject(Camera);
      fixture.detectChanges();
    })
  );

  it('IPC-01 should create', () => {
    expect(component).toBeTruthy();
  });

  it('IPC-02 Should take a photo', async () => {
    await component.takePicture(1);
    const getPictureSpy = camera.getPicture as jasmine.Spy;
    expect(getPictureSpy.calls.count()).toBe(1);
    expect(component.image64).toBeTruthy();
  });

  it('IPC-03 should show action sheet to choose a way to take the photo', async () => {
    await component.selectImage();
    const presentSpy = actionSheetElementSpy.present as jasmine.Spy;
    expect(presentSpy.calls.count()).toBe(1);
  });

  it('IPC-04 Should take a photo and then return the link of the uploaded image', async () => {
    await component.takePicture(1);
    const res = await component.upload();
    expect(res).toBe(photoUrl);
  });

  it("IPC-05 Shouldn't take a photo and then return the link of the uploaded image (empty string)", async () => {
    const res = await component.upload();
    expect(res).toBe('');
  });

  it('IPC-06 Pass a photo as input and without taking a new photo, at upload it must return the same input photo link', async () => {
    const newImageUrl = 'www.imagen.com/img.png';
    component.imageUrl = newImageUrl;
    const res = await component.upload();
    expect(res).toBe(newImageUrl);
  });

  it('IPC-07 Pass a photo as input and then take a new photo, at upload it must return the new photo link', async () => {
    const newImageUrl = 'www.imagen.com/img.png';
    component.imageUrl = newImageUrl;
    await component.takePicture(1);
    const res = await component.upload();
    expect(res).toBe(photoUrl);
  });
});

function createAngularFireStorageSpy() {
  const angularFireStorageRef = jasmine.createSpyObj('AngularFireStorageReference', {
    getDownloadURL: new Observable((observer: Observer<string>) => {
      observer.next(photoUrl);
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
  return testPet;
}
