import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { UserPage } from './user.page';

describe('UserPage', () => {
  let component: UserPage;
  let fixture: ComponentFixture<UserPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UserPage],
        imports: [IonicModule.forRoot(), AppRoutingModule],
        providers: [{ provide: SistemaService, useValue: buildSistemaService() }],
      }).compileComponents();

      fixture = TestBed.createComponent(UserPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function buildSistemaService() {
  return {
    admin: {
      adminUsuario: {
        obtenerUsuarios: () => [],
      },
    },
  };
}
