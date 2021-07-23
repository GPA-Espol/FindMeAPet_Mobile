import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabManagePage } from './tab-manage.page';

const routes: Routes = [
  {
    path: '',
    component: TabManagePage,
  },
  {
    path: 'noticias',
    loadChildren: () => import('./news/news.module').then((m) => m.NewsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabManagePageRoutingModule {}
