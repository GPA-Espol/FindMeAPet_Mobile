import { TestBed } from '@angular/core/testing';

import {
  AuthAdminGuard,
  AuthVoluntarioGuard,
  LoggedInGuard,
} from './auth.guard';

describe('AuthAdminGuard', () => {
  let guard: AuthAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

describe('AuthVoluntarioGuard', () => {
  let guard: AuthVoluntarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthVoluntarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

describe('LoggedInGuard', () => {
  let guard: LoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
