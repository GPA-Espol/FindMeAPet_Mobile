import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { Storage } from '@ionic/storage';
import { AuthAdminGuard, AuthVoluntarioGuard, LoggedInGuard } from './auth.guard';

describe('LoggedInGuard', () => {
  let guard: LoggedInGuard;
  let storage: Storage;
  beforeEach(async () => {
    let storageService = new Storage();
    storage = await storageService.create();
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot()],
    });
    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it("shouldn't active the guard", async () => {
    await storage.remove('usuario');
    expect(await guard.canActivate()).toBeFalse();
  });

  it('should active the guard', async () => {
    await storage.set('usuario', { token: 'abcd', rol: 'Admin' });
    expect(await guard.canActivate()).toBeTrue();
    await storage.remove('usuario');
  });
});

describe('AuthAdminGuard', () => {
  let guard: AuthAdminGuard;
  let storage: Storage;

  beforeEach(async () => {
    let storageService = new Storage();
    storage = await storageService.create();
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot()],
    });
    guard = TestBed.inject(AuthAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it("shouldn't active the guard", async () => {
    expect(await guard.canActivate()).toBeFalse();
  });

  it('should active the guard', async () => {
    await storage.set('usuario', { token: 'abcd', rol: 'Admin' });
    expect(await guard.canActivate()).toBeTrue();
    await storage.remove('usuario');
  });
});

describe('AuthVoluntarioGuard', () => {
  let guard: AuthVoluntarioGuard;
  let storage: Storage;

  beforeEach(async () => {
    let storageService = new Storage();
    storage = await storageService.create();
    TestBed.configureTestingModule({
      imports: [AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot()],
    });
    guard = TestBed.inject(AuthVoluntarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it("shouldn't active the guard", async () => {
    expect(await guard.canActivate()).toBeFalse();
  });

  it('should active the guard', async () => {
    await storage.set('usuario', { token: 'abcd', rol: 'Voluntario' });
    expect(await guard.canActivate()).toBeTrue();
    await storage.remove('usuario');
  });
});
