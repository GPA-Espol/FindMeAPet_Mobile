import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

import { TabRequestPage } from './tab-request.page';

describe('TabRequestPage', () => {
  let component: TabRequestPage;
  let fixture: ComponentFixture<TabRequestPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TabRequestPage],
        imports: [IonicModule.forRoot(), IonicStorageModule.forRoot(), ComponentsModule, AppRoutingModule],
      }).compileComponents();

      fixture = TestBed.createComponent(TabRequestPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
