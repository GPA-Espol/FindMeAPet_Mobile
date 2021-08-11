import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdoptionRequestPageRoutingModule } from './adoption-request-routing.module';

import { AdoptionRequestPage } from './adoption-request.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdoptionRequestPageRoutingModule,
    PipesModule
  ],
  declarations: [AdoptionRequestPage]
})
export class AdoptionRequestPageModule {}
