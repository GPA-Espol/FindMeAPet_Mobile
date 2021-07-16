import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCardComponent } from './admin-card/admin-card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AdminCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [AdminCardComponent],
})
export class ComponentsModule {}
