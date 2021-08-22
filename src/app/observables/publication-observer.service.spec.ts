import { TestBed } from '@angular/core/testing';

import { PublicationObserverService } from './publication-observer.service';

describe('PublicationObserverService', () => {
  let service: PublicationObserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicationObserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
