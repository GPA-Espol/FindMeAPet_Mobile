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
        loadChildren: () =>
          import('../pages/tab-pets/tab-pets.module').then(
            (m) => m.TabPetsPageModule
          ),
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('../pages/tab-pets/tab-pets.module').then(
            (m) => m.TabPetsPageModule
          ),
      },
      {
        path: 'inicio',
        loadChildren: () =>
          import('../pages/tab-pets/tab-pets.module').then(
            (m) => m.TabPetsPageModule
          ),
      },
      {
        path: 'solicitud',
        loadChildren: () =>
          import('../pages/tab-pets/tab-pets.module').then(
            (m) => m.TabPetsPageModule
          ),
      },
      {
        path: 'configuracion',
        loadChildren: () =>
          import('../pages/tab-pets/tab-pets.module').then(
            (m) => m.TabPetsPageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/voluntario/mascotas',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/voluntario/mascotas',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
