import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { RequestCardComponent } from './request-card.component';

describe('RequestCardComponent', () => {
  let component: RequestCardComponent;
  let fixture: ComponentFixture<RequestCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RequestCardComponent],
        imports: [IonicModule.forRoot()],
        providers: [{ provide: SistemaService, useValue: buildSistemaServiceMock() }],
      }).compileComponents();

      fixture = TestBed.createComponent(RequestCardComponent);
      component = fixture.componentInstance;
      component.propuesta = buildPropuesta();
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function buildSistemaServiceMock() {
  const sistemaServiceMock = {
    admin: {
      adminUsuario: {
        obtenerUsuarioPorId: () => {},
      },
    },
  };

  return sistemaServiceMock;
}

function buildPropuesta() {
  const propuesta = {
    id: 1,
    fecha: '2021-08-07',
    nombre: 'mmm',
    fecha_nacimiento: null,
    color: 'rayado',
    is_esterilizado: true,
    is_adoptado: true,
    is_caso_externo: true,
    is_adoptable: true,
    estado: 3,
    descripcion: null,
    sexo: 'M',
    fecha_adopcion: null,
    ubicacion: null,
    tipo_mascota: 'gata',
    id_usuario_admin: null,
    id_usuario_voluntario: 3,
    id_mascota: 3,
  };
  return propuesta;
}
