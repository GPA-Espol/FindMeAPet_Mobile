import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RequestsTypes } from './request-types.enum';

import { TabRequestPage } from './tab-request.page';

const routes: Routes = [
  {
    path: '',
    component: TabRequestPage,
  },
  {
    path: RequestsTypes.ADOPTION,
    loadChildren: () =>
      import('./adoption-request/adoption-request.module').then((m) => m.AdoptionRequestPageModule),
  },
  {
    path: RequestsTypes.VOLUNTEERS_REQUESTS,
    loadChildren: () =>
      import('../../pages/en-construccion/en-construccion.module').then((m) => m.EnConstruccionPageModule),
  },
  {
    path: RequestsTypes.EXTERNAL_CASES,
    loadChildren: () =>
      import('../../pages/en-construccion/en-construccion.module').then((m) => m.EnConstruccionPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabRequestPageRoutingModule {}
