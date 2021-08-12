import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VolunteerRequestPage } from './volunteer-request.page';

const routes: Routes = [
  {
    path: '',
    component: VolunteerRequestPage
  },
  {
    path: 'specific',
    loadChildren: () => import('./specific-volunteer-request/specific-volunteer-request.module').then( m => m.SpecificVolunteerRequestPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VolunteerRequestPageRoutingModule {}
