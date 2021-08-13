import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecificUserPageRoutingModule } from './specific-user-routing.module';

import { SpecificUserPage } from './specific-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecificUserPageRoutingModule
  ],
  declarations: [SpecificUserPage]
})
export class SpecificUserPageModule {}
