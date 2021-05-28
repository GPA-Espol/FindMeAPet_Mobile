import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPetsPageRoutingModule } from './tab-pets-routing.module';

import { TabPetsPage } from './tab-pets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabPetsPageRoutingModule
  ],
  declarations: [TabPetsPage]
})
export class TabPetsPageModule {}
