import { TestBed } from '@angular/core/testing';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import { AlertaService } from './alerta.service';

describe('AlertaService', () => {
  let service: AlertaService;
  let toastController: ToastController;
  let toastElementSpy: HTMLIonToastElement;
  let loadingController: LoadingController;
  let alertElementSpy: HTMLIonLoadingElement;
  beforeEach(() => {
    toastElementSpy = jasmine.createSpyObj('HTMLIonToastElement', ['present']);
    const toastSpy = jasmine.createSpyObj('ToastController', { create: toastElementSpy });
    alertElementSpy = jasmine.createSpyObj('HTMLIonToastElement', [
      'present',
      'dismiss',
    ]) as HTMLIonLoadingElement;
    const loadingSpy = jasmine.createSpyObj('LoadingController', { create: alertElementSpy });
    TestBed.configureTestingModule({
      providers: [
        { provide: ToastController, useValue: toastSpy },
        { provide: LoadingController, useValue: loadingSpy },
      ],
    });
    service = TestBed.inject(AlertaService);
    toastController = TestBed.inject(ToastController);
    loadingController = TestBed.inject(LoadingController);
  });

  it('AS-01 should be created', () => {
    expect(service).toBeTruthy();
  });

  it('AS-02 should present toast showing the string "test"', async () => {
    const message = 'test';
    await service.presentToast(message);
    const createSpy = toastController.create as jasmine.Spy;
    const createSpyArgs = createSpy.calls.first().args[0];
    expect(createSpyArgs.message).toBe(message);
    const toastElementPresentSpy = toastElementSpy.present as jasmine.Spy;
    expect(toastElementPresentSpy.calls.count()).toBe(1);
  });

  it('AS-03 should present loading showing the string "testing..."', async () => {
    const message = 'testing...';
    await service.presentLoading(message);
    const createSpy = loadingController.create as jasmine.Spy;
    const createSpyArgs = createSpy.calls.first().args[0];
    expect(createSpyArgs.message).toBe(message);
    const loadingElementPresentSpy = alertElementSpy.present as jasmine.Spy;
    expect(loadingElementPresentSpy.calls.count()).toBe(1);
  });

  it('AS-04 should dismiss a loading', async () => {
    const message = 'testing...';
    await service.presentLoading(message);
    await service.dismissLoading();
    const dismissSpy = alertElementSpy.dismiss as jasmine.Spy;
    expect(dismissSpy.calls.count()).toBe(1);
  });

  it('AS-05 should dismiss current loading if a new loading is going to be presented', async () => {
    const message = 'testing...';
    await service.presentLoading(message);
    await service.presentLoading(message);
    const dismissSpy = alertElementSpy.dismiss as jasmine.Spy;
    expect(dismissSpy.calls.count()).toBe(1);
  });

  it('AS-06 should do nothing if try to dismiss but no loading is on screen', async () => {
    await service.dismissLoading();
    const dismissSpy = alertElementSpy.dismiss as jasmine.Spy;
    expect(dismissSpy.calls.count()).toBe(0);
  });
});
