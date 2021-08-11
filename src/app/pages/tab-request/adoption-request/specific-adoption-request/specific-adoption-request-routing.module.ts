import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecificAdoptionRequestPage } from './specific-adoption-request.page';

const routes: Routes = [
  {
    path: '',
    component: SpecificAdoptionRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecificAdoptionRequestPageRoutingModule {}
