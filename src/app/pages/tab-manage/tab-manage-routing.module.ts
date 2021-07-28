import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabManagePage } from './tab-manage.page';

const routes: Routes = [
  {
    path: '',
    component: TabManagePage,
  },
  {
    path: 'Noticia',
    loadChildren: () => import('./publication/publication.module').then((m) => m.PublicationPageModule),
  },
  {
    path: 'Evento',
    loadChildren: () => import('./publication/publication.module').then((m) => m.PublicationPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabManagePageRoutingModule {}
