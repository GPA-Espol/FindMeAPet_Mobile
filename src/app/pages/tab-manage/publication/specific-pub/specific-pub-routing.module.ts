import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecificPubPage } from './specific-pub.page';

const routes: Routes = [
  {
    path: '',
    component: SpecificPubPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecificPubPageRoutingModule {}
