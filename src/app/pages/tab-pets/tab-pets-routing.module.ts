import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPetsPage } from './tab-pets.page';

const routes: Routes = [
  {
    path: '',
    component: TabPetsPage,
  },
  {
    path: 'anadir',
    loadChildren: () => import('./add-pet/add-pet.module').then((m) => m.AddPetPageModule),
  },
  {
    path: 'informacion/:id',
    loadChildren: () => import('./specific-pet/specific-pet.module').then((m) => m.SpecificPetPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPetsPageRoutingModule {}
