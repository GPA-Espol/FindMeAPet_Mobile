import { TestBed } from '@angular/core/testing';
import { StorageService } from '../storage/storage.service';

import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;
  const storageServiceSpy = jasmine.createSpyObj('storageService', ['get', 'set']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: StorageService, useValue: storageServiceSpy }],
    });
    service = TestBed.inject(NotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

function buildStorageService() {}
