import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecificAdoptionRequestPageRoutingModule } from './specific-adoption-request-routing.module';

import { SpecificAdoptionRequestPage } from './specific-adoption-request.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecificAdoptionRequestPageRoutingModule
  ],
  declarations: [SpecificAdoptionRequestPage]
})
export class SpecificAdoptionRequestPageModule {}
