import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsuarioGPA } from 'src/app/model/usuario_gpa.model';
import { Mode } from 'src/app/utils/utils';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  mode: Mode;
  userForm: FormGroup;
  userToEdit: UsuarioGPA;
  tipoUsuario: string;
  private idUser: number;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.setBuildForm();
    this.setMode();
  }

  setBuildForm() {
    this.userForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      correo: ['', [Validators.email, Validators.required]],
      fechaNacimiento: [new Date().toISOString(), Validators.required],
      sexo: ['', Validators.required],
      isEstEspol: [false, Validators.required],
      tipoUsuario: ['', Validators.required],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      rolVoluntario: '',
      horarios: '',
    });
  }

  setMode() {
    let route = this.router.url;
    let array = route.split('/');
    let end = array[array.length - 1];
    this.mode = end == 'anadir' ? Mode.ANADIR : Mode.EDITAR;
    if (this.mode == Mode.EDITAR) {
      this.getData();
    }
  }

  onSubmit() {}

  goback() {
    this.navCtrl.pop();
  }

  private getData() {
    this.idUser = +this.route.snapshot.paramMap.get('id');
  }
}
