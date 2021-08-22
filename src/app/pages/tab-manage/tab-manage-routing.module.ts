import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoPublicacion } from 'src/app/model/enums.model';

import { TabManagePage } from './tab-manage.page';

const routes: Routes = [
  {
    path: '',
    component: TabManagePage,
  },
  {
    path: TipoPublicacion.NOTICIA,
    loadChildren: () => import('./publication/publication.module').then((m) => m.PublicationPageModule),
  },
  {
    path: TipoPublicacion.EVENTO,
    loadChildren: () => import('./publication/publication.module').then((m) => m.PublicationPageModule),
  },
  {
    path: 'Usuario',
    loadChildren: () => import('./user/user.module').then((m) => m.UserPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabManagePageRoutingModule {}
