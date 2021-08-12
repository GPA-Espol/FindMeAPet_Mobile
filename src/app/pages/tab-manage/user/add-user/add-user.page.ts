import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { RolUsuario } from 'src/app/model/enums.model';
import { UsuarioGPA } from 'src/app/model/usuario_gpa.model';
import { Voluntario } from 'src/app/model/voluntario.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';
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
  tipoUsuario = '';
  private idUser: number;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sistema: SistemaService
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

  onSubmit() {
    if (this.tipoUsuario == RolUsuario.ADMIN) {
    }
  }

  submitAdmin() {
    const { adminUsuario } = this.sistema.admin;
    const password = this.userForm.get('password').value;
    if (this.mode == Mode.ANADIR) {
      const admin = new Administrador();
      this.setValues(admin);
      adminUsuario.agregarAdministrador(admin, password);
    }
  }

  submitVoluntario() {
    const { adminUsuario } = this.sistema.admin;
    const password = this.userForm.get('password').value;
    if (this.mode == Mode.ANADIR) {
      const voluntario = new Voluntario();
      this.setValues(voluntario);
      voluntario.horario = this.userForm.get('horarios').value;
      voluntario.rol = this.userForm.get('rolVoluntario').value;
      adminUsuario.agregarVoluntario(voluntario, password);
    }
  }

  private setValues(user: UsuarioGPA) {
    user.nombre = this.userForm.get('nombre').value;
    user.apellido = this.userForm.get('apellido').value;
    user.nombreUsuario = this.userForm.get('nombreUsuario').value;
    user.correo = this.userForm.get('correo').value;
    user.fechaNacimiento = this.userForm.get('fechaNacimiento').value;
    user.sexo = this.userForm.get('sexo').value;
    user.isEstESPOL = this.userForm.get('isEstEspol').value;
  }

  onUserTypeChange($event: any) {
    this.tipoUsuario = $event.target.value;
  }

  goback() {
    this.navCtrl.pop();
  }

  private getData() {
    this.idUser = +this.route.snapshot.paramMap.get('id');
  }
}
