import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnConstruccionPage } from './en-construccion.page';

const routes: Routes = [
  {
    path: '',
    component: EnConstruccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnConstruccionPageRoutingModule {}
