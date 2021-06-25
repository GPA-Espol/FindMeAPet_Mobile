import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AddPetPage } from './add-pet.page';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddPetPage', () => {
  let component: AddPetPage;
  let fixture: ComponentFixture<AddPetPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AddPetPage],
        imports: [
          IonicModule.forRoot(),
          AngularFireModule.initializeApp(environment.firebase),
          HttpClientTestingModule,
          IonicStorageModule.forRoot(),
          AppRoutingModule,
          ReactiveFormsModule,
        ],
        providers: [Camera],
      }).compileComponents();

      fixture = TestBed.createComponent(AddPetPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('APP-01 should create', () => {
    expect(component).toBeTruthy();
  });
});
