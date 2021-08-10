import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabRequestPage } from './tab-request.page';

const routes: Routes = [
  {
    path: '',
    component: TabRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabRequestPageRoutingModule {}
