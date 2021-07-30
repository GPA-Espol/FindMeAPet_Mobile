import { TestBed } from '@angular/core/testing';

import { PetObserverService } from './pet-observer.service';

describe('PetObserverService', () => {
  let service: PetObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
