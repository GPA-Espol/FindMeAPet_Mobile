import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { TabPetsPage } from './tab-pets.page';

describe('TabPetsPage', () => {
  let component: TabPetsPage;
  let fixture: ComponentFixture<TabPetsPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TabPetsPage],
        imports: [IonicModule.forRoot(), PipesModule, AppRoutingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(TabPetsPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
