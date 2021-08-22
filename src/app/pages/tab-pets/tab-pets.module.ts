import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabPetsPageRoutingModule } from './tab-pets-routing.module';

import { TabPetsPage } from './tab-pets.page';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TabPetsPageRoutingModule, PipesModule, ComponentsModule],
  declarations: [TabPetsPage],
})
export class TabPetsPageModule {}
