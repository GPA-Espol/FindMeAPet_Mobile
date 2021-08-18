import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TipoPublicacion } from 'src/app/model/enums.model';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { ManageCardComponent } from './manage-card.component';

describe('ManageCardComponent', () => {
  let component: ManageCardComponent;
  let fixture: ComponentFixture<ManageCardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ManageCardComponent],
        imports: [IonicModule.forRoot(), AppRoutingModule, PipesModule],
      }).compileComponents();

      fixture = TestBed.createComponent(ManageCardComponent);
      component = fixture.componentInstance;
      component.publicacion = buildPublication();
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function buildPublication() {
  const publication = new Publicacion();
  publication.id = 5;
  publication.descripcion = 'Description';
  publication.fecha = new Date();
  publication.idUsuario = 1;
  publication.imagenUrl = 'imagen.png';
  publication.tipo = TipoPublicacion.EVENTO;
  publication.titulo = 'Este es un titulo';
  return publication;
}
