import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdoptionRequestPage } from './adoption-request.page';

const routes: Routes = [
  {
    path: '',
    component: AdoptionRequestPage,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./specific-adoption-request/specific-adoption-request.module').then(
        (m) => m.SpecificAdoptionRequestPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdoptionRequestPageRoutingModule {}
