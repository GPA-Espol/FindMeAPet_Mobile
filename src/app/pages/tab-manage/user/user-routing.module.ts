import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Mode } from 'src/app/utils/utils';

import { UserPage } from './user.page';

const routes: Routes = [
  {
    path: '',
    component: UserPage,
  },
  {
    path: Mode.ANADIR,
    loadChildren: () => import('./add-user/add-user.module').then((m) => m.AddUserPageModule),
  },
  {
    path: Mode.EDITAR + '/:id',
    loadChildren: () => import('./add-user/add-user.module').then((m) => m.AddUserPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserPageRoutingModule {}
