import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { TabManagePage } from './tab-manage.page';

describe('TabManagePage', () => {
  let component: TabManagePage;
  let fixture: ComponentFixture<TabManagePage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TabManagePage],
        imports: [IonicModule.forRoot(), ComponentsModule, AppRoutingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(TabManagePage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
