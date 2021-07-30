import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCardComponent } from './admin-card/admin-card.component';
import { IonicModule } from '@ionic/angular';
import { ManageCardComponent } from './manage-card/manage-card.component';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { RouterModule } from '@angular/router';
import { ImagePickerComponent } from './image-picker/image-picker.component';

@NgModule({
  declarations: [AdminCardComponent, ManageCardComponent, EmptyListComponent, ImagePickerComponent],
  imports: [CommonModule, IonicModule, RouterModule],
  exports: [AdminCardComponent, ManageCardComponent, EmptyListComponent, ImagePickerComponent],
})
export class ComponentsModule {}
