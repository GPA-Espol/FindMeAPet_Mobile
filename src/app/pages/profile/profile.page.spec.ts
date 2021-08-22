import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { RolUsuario } from 'src/app/model/enums.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { ProfilePage } from './profile.page';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProfilePage],
        imports: [IonicModule.forRoot()],
        providers: [{ provide: SistemaService, useValue: buildSistemaService() }],
      }).compileComponents();

      fixture = TestBed.createComponent(ProfilePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function buildSistemaService() {
  const admin = new Administrador();
  return {
    userLoggedIn: () => {
      return { token: 'string', rol: RolUsuario.ADMIN, id: 5 };
    },
    admin,
  };
}
