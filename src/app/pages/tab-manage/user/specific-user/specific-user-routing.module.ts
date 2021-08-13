import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecificUserPage } from './specific-user.page';

const routes: Routes = [
  {
    path: '',
    component: SpecificUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecificUserPageRoutingModule {}
