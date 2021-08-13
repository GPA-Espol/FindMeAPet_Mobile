import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VolunteerRequestPageRoutingModule } from './volunteer-request-routing.module';

import { VolunteerRequestPage } from './volunteer-request.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VolunteerRequestPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VolunteerRequestPage]
})
export class VolunteerRequestPageModule {}
