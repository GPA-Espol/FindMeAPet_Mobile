import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecificPetPage } from './specific-pet.page';

const routes: Routes = [
  {
    path: '',
    component: SpecificPetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecificPetPageRoutingModule {}
