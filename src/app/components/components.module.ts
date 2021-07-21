import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCardComponent } from './admin-card/admin-card.component';
import { IonicModule } from '@ionic/angular';
import { ManageCardComponent } from './manage-card/manage-card.component';

@NgModule({
  declarations: [AdminCardComponent, ManageCardComponent],
  imports: [CommonModule, IonicModule],
  exports: [AdminCardComponent, ManageCardComponent],
})
export class ComponentsModule {}
