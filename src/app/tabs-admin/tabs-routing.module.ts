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
        loadChildren: () =>
          import('../pages/en-construccion/en-construccion.module').then((m) => m.EnConstruccionPageModule),
      },
      {
        path: 'solicitud',
        loadChildren: () =>
          import('../pages/en-construccion/en-construccion.module').then((m) => m.EnConstruccionPageModule),
      },
      {
        path: 'configuracion',
        loadChildren: () =>
          import('../pages/en-construccion/en-construccion.module').then((m) => m.EnConstruccionPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/admin/mascotas',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/admin/mascotas',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
