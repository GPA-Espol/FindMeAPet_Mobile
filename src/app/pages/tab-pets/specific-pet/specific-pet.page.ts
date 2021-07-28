import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Mascota } from 'src/app/model/mascota.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-specific-pet',
  templateUrl: './specific-pet.page.html',
  styleUrls: ['./specific-pet.page.scss'],
})
export class SpecificPetPage implements OnInit {
  pet: Mascota;
  loading = true;
  constructor(private sistema: SistemaService, private route: ActivatedRoute) {}
  async ngOnInit() {
    this.loading = true;
    await this.getPetPage();
    this.loading = false;
  }

  async getPetPage() {
    let id = this.route.snapshot.paramMap.get('id');
    this.pet = await this.sistema.getMascotabyId(id);
  }
}
