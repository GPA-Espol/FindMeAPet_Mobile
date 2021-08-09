import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabRequestPageRoutingModule } from './tab-request-routing.module';

import { TabRequestPage } from './tab-request.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabRequestPageRoutingModule,
    ComponentsModule
  ],
  declarations: [TabRequestPage]
})
export class TabRequestPageModule {}
