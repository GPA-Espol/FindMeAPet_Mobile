import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCardComponent } from './admin-card/admin-card.component';
import { IonicModule } from '@ionic/angular';
import { ManageCardComponent } from './manage-card/manage-card.component';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AdminCardComponent, ManageCardComponent, EmptyListComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [AdminCardComponent, ManageCardComponent, EmptyListComponent],
})
export class ComponentsModule {}
