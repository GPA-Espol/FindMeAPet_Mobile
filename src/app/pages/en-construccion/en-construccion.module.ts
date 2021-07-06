import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnConstruccionPageRoutingModule } from './en-construccion-routing.module';

import { EnConstruccionPage } from './en-construccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnConstruccionPageRoutingModule
  ],
  declarations: [EnConstruccionPage]
})
export class EnConstruccionPageModule {}
