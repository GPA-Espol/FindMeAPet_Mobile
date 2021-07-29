import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicationPage } from './publication.page';

const routes: Routes = [
  {
    path: '',
    component: PublicationPage,
  },
  {
    path: 'agregar',
    loadChildren: () =>
      import('./add-publication/add-publication.module').then((m) => m.AddPublicationPageModule),
  },
  {
    path: 'editar',
    loadChildren: () =>
      import('./add-publication/add-publication.module').then((m) => m.AddPublicationPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicationPageRoutingModule {}
