import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecificUserPageRoutingModule } from './specific-user-routing.module';

import { SpecificUserPage } from './specific-user.page';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule, SpecificUserPageRoutingModule, PipesModule],
  declarations: [SpecificUserPage],
})
export class SpecificUserPageModule {}
