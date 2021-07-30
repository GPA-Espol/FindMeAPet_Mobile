import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Publicacion } from 'src/app/model/publicacion.model';

@Component({
  selector: 'app-manage-card',
  templateUrl: './manage-card.component.html',
  styleUrls: ['./manage-card.component.scss'],
})
export class ManageCardComponent implements OnInit {
  DISPLAY_TEXT_MAX_LENGTH = 200;
  display_description: string;
  @Input() publicacion: Publicacion;
  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.truncateText();
  }

  private truncateText() {
    const description = this.publicacion.descripcion;
    if (description.length > this.DISPLAY_TEXT_MAX_LENGTH) {
      this.display_description = description.substr(0, this.DISPLAY_TEXT_MAX_LENGTH) + '...';
    } else {
      this.display_description = description;
    }
  }

  async delete() {
    const alert = await this.alertController.create({
      header: '¡Espera!',
      message: '¿Estás seguro que deseas eliminar esta publicación?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            console.log('Eliminar publicación');
            //TODO eliminar publicación
          },
        },
      ],
    });
    await alert.present();
  }

  edit() {
    console.log('Editar');
    //TODO Redireccionar a página de editar
  }
}
