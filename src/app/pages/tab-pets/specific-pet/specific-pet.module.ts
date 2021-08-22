import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecificPetPageRoutingModule } from './specific-pet-routing.module';

import { SpecificPetPage } from './specific-pet.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SpecificPetPageRoutingModule, PipesModule],
  declarations: [SpecificPetPage],
})
export class SpecificPetPageModule {}
