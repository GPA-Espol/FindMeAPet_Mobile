import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ImagePickerComponent } from 'src/app/components/image-picker/image-picker.component';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { RolUsuario } from 'src/app/model/enums.model';
import { UsuarioGPA } from 'src/app/model/usuario_gpa.model';
import { Voluntario } from 'src/app/model/voluntario.model';
import { UserService } from 'src/app/observables/user.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
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
  loading = true;
  editPassword: false;
  @ViewChild('imgPicker') imgPicker: ImagePickerComponent;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private sistema: SistemaService,
    private alert: AlertaService,
    private userObserver: UserService
  ) {}

  async ngOnInit() {
    await this.setMode();
    this.setBuildForm();
    this.loading = false;
  }

  setBuildForm() {
    const rolVoluntario = (this.userToEdit as any)?.rol;
    this.userForm = this.formBuilder.group({
      nombre: [this.userToEdit?.nombre || '', Validators.required],
      apellido: [this.userToEdit?.apellido || '', Validators.required],
      nombreUsuario: [this.userToEdit?.nombreUsuario || '', Validators.required],
      correo: [this.userToEdit?.correo || '', [Validators.email, Validators.required]],
      fechaNacimiento: [
        this.userToEdit?.fechaNacimiento.toISOString() || new Date().toISOString(),
        Validators.required,
      ],
      sexo: [this.userToEdit?.sexo || '', Validators.required],
      isEstEspol: [this.userToEdit?.isEstESPOL || false, Validators.required],
      tipoUsuario: [this.tipoUsuario || '', Validators.required],
      password: [''],
      repeatPassword: ['', Validators.required],
      rolVoluntario: rolVoluntario || '',
      horarios: '',
    });
  }

  async setMode() {
    const route = this.router.url;
    const array = route.split('/');
    const end = array[array.length - 1];
    this.mode = end == 'anadir' ? Mode.ANADIR : Mode.EDITAR;
    if (this.mode == Mode.EDITAR) {
      await this.getData();
    }
  }

  async onSubmit() {
    await this.alert.presentLoading('Guardando...');
    try {
      if (this.tipoUsuario == RolUsuario.ADMIN) {
        await this.submitAdmin();
      } else {
        await this.submitVoluntario();
      }
    } catch (ex) {
      console.log('Ha ocurrido un error al enviar el usuario, ', ex);
      this.alert.presentToast('Ha ocurrido un error al guardar el usuario');
    }
    this.alert.dismissLoading();
  }

  async submitAdmin() {
    const { adminUsuario } = this.sistema.admin;
    const password = this.userForm.get('password').value;
    const admin = new Administrador();
    await this.setValues(admin);
    if (this.mode == Mode.ANADIR) {
      if (!this.validatePassword()) {
        return;
      }
      await adminUsuario.agregarAdministrador(admin, password);
    } else {
      if (this.editPassword && !this.validatePassword()) {
        return;
      }
      admin.id = this.userToEdit.id;
      const passwordToSend = this.editPassword ? password : undefined;
      await adminUsuario.actualizarAdministrador(admin, passwordToSend);
    }
    this.goback();
    this.userObserver.publish();
  }

  async submitVoluntario() {
    const { adminUsuario } = this.sistema.admin;
    const password = this.userForm.get('password').value;
    const voluntario = new Voluntario();
    await this.setValues(voluntario);
    voluntario.horario = this.userForm.get('horarios').value;
    voluntario.rol = this.userForm.get('rolVoluntario').value;
    if (this.mode == Mode.ANADIR) {
      if (!this.validatePassword()) {
        return;
      }
      await adminUsuario.agregarVoluntario(voluntario, password);
    } else {
      if (this.editPassword && !this.validatePassword()) {
        return;
      }
      voluntario.id = this.userToEdit.id;
      const passwordToSend = this.editPassword ? password : undefined;
      await adminUsuario.actualizarVoluntario(voluntario, passwordToSend);
    }
    this.goback();
    this.userObserver.publish();
  }

  validatePassword() {
    const password = this.userForm.get('password').value;
    const repeatPassword = this.userForm.get('repeatPassword').value;
    if (!password) {
      this.alert.presentToast('El campo contraseña es requerido');
      this.userForm.get('password').setErrors({ password: 'El campo contraseña es requerido' });
      return false;
    }
    if (password != repeatPassword) {
      this.alert.presentToast('Las contraseñas no coinciden');
      this.userForm.get('repeatPassword').setErrors({ repeatPassword: 'Las contraseñas no coinciden' });
      return false;
    }
    return true;
  }

  private async setValues(user: UsuarioGPA) {
    user.nombre = this.userForm.get('nombre').value;
    user.apellido = this.userForm.get('apellido').value;
    user.nombreUsuario = this.userForm.get('nombreUsuario').value;
    user.correo = this.userForm.get('correo').value;
    user.fechaNacimiento = new Date(this.userForm.get('fechaNacimiento').value);
    user.fechaNacimiento.setHours(0, 0, 0, 0);
    user.sexo = this.userForm.get('sexo').value;
    user.isEstESPOL = this.userForm.get('isEstEspol').value;
    user.foto = await this.imgPicker.upload();
  }

  onUserTypeChange($event: any) {
    this.tipoUsuario = $event.target.value;
  }

  onEditPasswordChange($event: any) {
    this.editPassword = $event.target.checked;
  }

  goback() {
    this.navCtrl.pop();
  }

  private async getData() {
    const idUser = +this.route.snapshot.paramMap.get('id');
    const { adminUsuario } = this.sistema.admin;
    this.userToEdit = await adminUsuario.obtenerUsuarioPorId(idUser);
    this.tipoUsuario = this.userToEdit instanceof Administrador ? RolUsuario.ADMIN : RolUsuario.VOLUNTARIO;
  }
}
