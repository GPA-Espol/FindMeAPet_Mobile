import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './storage.service';
import { Storage } from '@ionic/storage';

describe('StorageService', () => {
  let service: StorageService;
  let storage: Storage;
  let key = 'test';
  beforeEach(async () => {
    let storageService = new Storage();
    storage = await storageService.create();
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
    });
    service = TestBed.inject(StorageService);
  });

  it('TS-01 should be created', () => {
    expect(service).toBeTruthy();
  });

  it('TS-02 Should save a value on localStorage', async () => {
    let objectToSave = { test: 'test' };
    await service.set(key, objectToSave);
    let test = await storage.get(key);
    expect(test).toEqual(objectToSave);
  });

  it('TS-03 Should get a value from localStorage', async () => {
    let objectToGet = { test: 'test' };
    await storage.set(key, objectToGet);
    let test = await service.get(key);
    expect(test).toEqual(objectToGet);
  });

  it('TS-04 Should remove a value from localStorage', async () => {
    let objectToGet = { test: 'test' };
    await storage.set(key, objectToGet);
    await service.remove(key);
    let test = await storage.get(key);
    expect(test).toBeNull();
  });

  afterEach(async () => {
    await storage.remove(key);
  });
});
