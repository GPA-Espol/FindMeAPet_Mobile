import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mascota } from 'src/app/model/mascota.model';
import { PetObserverService } from 'src/app/observables/pet-observer.service';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-specific-pet',
  templateUrl: './specific-pet.page.html',
  styleUrls: ['./specific-pet.page.scss'],
})
export class SpecificPetPage implements OnInit {
  private petSubscription: Subscription;
  pet: Mascota;
  loading = true;
  constructor(
    private sistema: SistemaService,
    private route: ActivatedRoute,
    private petObserver: PetObserverService
  ) {}
  async ngOnInit() {
    this.loading = true;
    await this.getPetPage();
    this.petSubscription = this.petObserver.getObservable().subscribe((mascota) => (this.pet = mascota));
    this.loading = false;
  }

  async getPetPage() {
    let identification = +this.route.snapshot.paramMap.get('id');
    this.pet = this.sistema.mascotas.find((pet) => pet.id == identification);
    //this.pet = await this.sistema.getMascotabyId(id);
  }

  ngOnDestroy() {
    this.petSubscription.unsubscribe();
  }
}
