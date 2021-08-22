import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { AdminCardComponent } from './admin-card.component';

describe('AdminCardComponent', () => {
  let component: AdminCardComponent;
  let fixture: ComponentFixture<AdminCardComponent>;

  beforeEach(
    waitForAsync(() => {
      const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
      TestBed.configureTestingModule({
        declarations: [AdminCardComponent],
        imports: [IonicModule.forRoot(), CommonModule],
        providers: [
          { provide: Router, useValue: routerSpy },
          { provide: ActivatedRoute, useValue: {} },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(AdminCardComponent);
      component = fixture.componentInstance;
      component.icon = 'icono.png';
      component.description = 'description';
      component.redirectTo = '/description';
      component.notifications = 5;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
