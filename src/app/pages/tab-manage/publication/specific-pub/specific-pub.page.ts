import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publicacion } from 'src/app/model/publicacion.model';
import { SistemaService } from 'src/app/services/sistema/sistema.service';

@Component({
  selector: 'app-specific-pub',
  templateUrl: './specific-pub.page.html',
  styleUrls: ['./specific-pub.page.scss'],
})
export class SpecificPubPage implements OnInit {
  loading = true;
  publication: Publicacion;
  constructor(private route: ActivatedRoute, private sistema: SistemaService) {}

  async ngOnInit() {
    await this.setPublicationInfo();
    this.loading = false;
  }

  private async setPublicationInfo() {
    let idPublication: number;
    this.route.paramMap.subscribe((paramMap) => {
      idPublication = +paramMap.get('id');
    });
    const { adminPublicacion } = this.sistema.admin;
    this.publication = await adminPublicacion.verPublicacion(idPublication);
  }
}
