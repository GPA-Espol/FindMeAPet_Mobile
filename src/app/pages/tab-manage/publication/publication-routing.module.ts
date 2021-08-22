import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Mode } from 'src/app/utils/utils';

import { PublicationPage } from './publication.page';

const routes: Routes = [
  {
    path: '',
    component: PublicationPage,
  },
  {
    path: Mode.ANADIR,
    loadChildren: () =>
      import('./add-publication/add-publication.module').then((m) => m.AddPublicationPageModule),
  },
  {
    path: Mode.EDITAR + '/:id',
    loadChildren: () =>
      import('./add-publication/add-publication.module').then((m) => m.AddPublicationPageModule),
  },
  {
    path: 'informacion/:id',
    loadChildren: () => import('./specific-pub/specific-pub.module').then((m) => m.SpecificPubPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicationPageRoutingModule {}
