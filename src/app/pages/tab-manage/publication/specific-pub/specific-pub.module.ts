import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecificPubPageRoutingModule } from './specific-pub-routing.module';

import { SpecificPubPage } from './specific-pub.page';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecificPubPageRoutingModule,
    PipesModule
  ],
  declarations: [SpecificPubPage]
})
export class SpecificPubPageModule {}
