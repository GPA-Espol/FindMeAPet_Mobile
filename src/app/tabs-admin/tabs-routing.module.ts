import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'mascotas',
        loadChildren: () => import('../pages/tab-pets/tab-pets.module').then((m) => m.TabPetsPageModule),
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('../pages/en-construccion/en-construccion.module').then((m) => m.EnConstruccionPageModule),
      },
      {
        path: 'inicio',
        loadChildren: () => import('../pages/tab-home/tab-home.module').then((m) => m.TabHomePageModule),
      },
      {
        path: 'solicitud',
        loadChildren: () =>
          import('../pages/tab-request/tab-request.module').then((m) => m.TabRequestPageModule),
      },
      {
        path: 'configuracion',
        loadChildren: () =>
          import('../pages/tab-manage/tab-manage.module').then((m) => m.TabManagePageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/admin/inicio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/admin/inicio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
