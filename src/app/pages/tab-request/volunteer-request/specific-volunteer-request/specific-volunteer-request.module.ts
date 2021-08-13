import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecificVolunteerRequestPageRoutingModule } from './specific-volunteer-request-routing.module';

import { SpecificVolunteerRequestPage } from './specific-volunteer-request.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecificVolunteerRequestPageRoutingModule,
    ComponentsModule
  ],
  declarations: [SpecificVolunteerRequestPage]
})
export class SpecificVolunteerRequestPageModule {}
