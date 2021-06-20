import { TestBed } from '@angular/core/testing';

import { AlertaService } from './alerta.service';

describe('AlertaService', () => {
  let service: AlertaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertaService);
  });

  it('AS-01 should be created', () => {
    expect(service).toBeTruthy();
  });
});
