import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonGrid } from '@ionic/angular';

enum UserType {
  Volunteer = 'Voluntario',
  Admin = 'Administrador',
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  userType: UserType = UserType.Volunteer;
  otherUserType: UserType = UserType.Admin;
  @ViewChild('separator') separator: ElementRef;
  @ViewChild('content') content: ElementRef;
  constructor() {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {}

  switchUserType() {
    this.separator.nativeElement.classList.add('switch-user-type-animation');
    this.content.nativeElement.classList.add('switch-user-type-animation');
    setTimeout(() => {
      this.separator.nativeElement.classList.remove(
        'switch-user-type-animation'
      );
      this.content.nativeElement.classList.remove('switch-user-type-animation');
    }, 500);
    if (this.userType == UserType.Admin) {
      this.userType = UserType.Volunteer;
      this.otherUserType = UserType.Admin;
    } else {
      this.userType = UserType.Admin;
      this.otherUserType = UserType.Volunteer;
    }
  }
}