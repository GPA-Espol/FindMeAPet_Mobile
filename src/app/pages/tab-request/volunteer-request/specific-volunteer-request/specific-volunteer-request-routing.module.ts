import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecificVolunteerRequestPage } from './specific-volunteer-request.page';

const routes: Routes = [
  {
    path: '',
    component: SpecificVolunteerRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecificVolunteerRequestPageRoutingModule {}
