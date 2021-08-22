import { Component, OnInit } from '@angular/core';
import { TipoPublicacion } from 'src/app/model/enums.model';

/**
 * Class in charge of showing the managing options.
 * @category Components
 */

@Component({
  selector: 'app-tab-manage',
  templateUrl: './tab-manage.page.html',
  styleUrls: ['./tab-manage.page.scss'],
})
export class TabManagePage {
  /**
   * Array with the options information to which the user can redirect
   * its elements are with the following attributes:
   * - redirectTo: relative route to which the user will be redirected when press the option
   * - icon: route to the icon.
   * - description: Option description, it will be shown to the user in the view
   */
  options = [
    {
      redirectTo: TipoPublicacion.NOTICIA,
      icon: '/assets/icon/newspaper.svg',
      description: 'Administrar Noticias',
    },
    {
      redirectTo: TipoPublicacion.EVENTO,
      icon: '/assets/icon/events.svg',
      description: 'Administrar Eventos',
    },
    {
      redirectTo: 'Usuario',
      icon: '/assets/icon/users.svg',
      description: 'Administrar Usuarios',
    },
  ];
}
