import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabManagePageRoutingModule } from './tab-manage-routing.module';

import { TabManagePage } from './tab-manage.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabManagePageRoutingModule,
    ComponentsModule
  ],
  declarations: [TabManagePage]
})
export class TabManagePageModule {}
