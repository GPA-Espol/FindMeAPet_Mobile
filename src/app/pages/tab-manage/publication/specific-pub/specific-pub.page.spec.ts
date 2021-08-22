import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Publicacion } from 'src/app/model/publicacion.model';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

import { SpecificPubPage } from './specific-pub.page';

describe('SpecificPubPage', () => {
  let component: SpecificPubPage;
  let fixture: ComponentFixture<SpecificPubPage>;

  beforeEach(
    waitForAsync(() => {
      const navCtrlSpy = jasmine.createSpyObj('NavController', ['pop']);
      TestBed.configureTestingModule({
        declarations: [SpecificPubPage],
        imports: [IonicModule.forRoot(), PipesModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                paramMap: {
                  get: (id) => 5,
                },
              },
            },
          },
          {
            provide: SistemaService,
            useValue: buildSistemaService(),
          },
          {
            provide: NavController,
            useValue: navCtrlSpy,
          },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(SpecificPubPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function buildSistemaService() {
  const publication = new Publicacion();
  return {
    admin: {
      adminPublicacion: {
        verPublicacion: (id) => publication,
        eliminarPublicacion: (id) => {},
      },
    },
  };
}
