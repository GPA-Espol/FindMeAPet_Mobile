import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Administrador } from 'src/app/model/admin/administrador.model';
import { RolUsuario } from 'src/app/model/enums.model';
import { Mascota } from 'src/app/model/mascota.model';
import { PetObserverService } from 'src/app/observables/pet-observer.service';
import { AlertaService } from 'src/app/services/alerta/alerta.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

/**
 * Class in charge of the behaviour of a specific pet page
 * @category Components
 */
@Component({
  selector: 'app-specific-pet',
  templateUrl: './specific-pet.page.html',
  styleUrls: ['./specific-pet.page.scss'],
})
export class SpecificPetPage implements OnInit {
  private petSubscription: Subscription;
  pet: Mascota;
  loading = true;
  administrador: Administrador;
  constructor(
    private sistema: SistemaService,
    private route: ActivatedRoute,
    private petObserver: PetObserverService,
    private alertaService: AlertaService,
    public alertController: AlertController,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.loading = true;
    await this.getPetPage();
    this.petSubscription = this.petObserver.getObservable().subscribe((mascota) => (this.pet = mascota));
    this.createUser();
    this.loading = false;
  }

  /**
   * Method to store the pet whose is information will be displayed in the page
   */
  async getPetPage() {
    let identification = +this.route.snapshot.paramMap.get('id');
    this.pet = this.sistema.mascotas.find((pet) => pet.id == identification);
    //this.pet = await this.sistema.getMascotabyId(id);
  }

  /**
   * Method that create the user (admin or voluntario) to perform specific functions in the page
   */
  async createUser() {
    let userLogged = await this.sistema.userLoggedIn();
    if (userLogged.rol == RolUsuario.ADMIN) {
      this.administrador = this.sistema.admin;
    }
  }

  /**
   * Method that displays the modal when pressing the delete button, to ask for confirmation
   */
  async modaDelete() {
    const message = 'La mascota se eliminará permanentemente';
    await this.alertaService.confirmationAlert(message, this.deletePet.bind(this));
  }

  /**
   * Method that calls the service to delete the pet and navigates to previous page
   */
  async deletePet() {
    await this.alertaService.presentLoading('Eliminando...');
    await this.administrador.adminMascota.eliminarMascota(this.pet.id);
    this.alertaService.dismissLoading();
    this.navCtrl.pop();
    await this.alertaService.presentToast('La mascota ha sido eliminada');
  }

  ngOnDestroy() {
    this.petSubscription.unsubscribe();
  }
}
