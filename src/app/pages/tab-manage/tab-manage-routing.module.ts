import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabManagePage } from './tab-manage.page';

const routes: Routes = [
  {
    path: '',
    component: TabManagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabManagePageRoutingModule {}
