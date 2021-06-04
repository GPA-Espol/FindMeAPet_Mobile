import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPetsPage } from './tab-pets.page';

const routes: Routes = [
  {
    path: '',
    component: TabPetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPetsPageRoutingModule {}
