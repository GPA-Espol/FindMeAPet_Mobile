import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminCardComponent } from './admin-card/admin-card.component';
import { IonicModule } from '@ionic/angular';
import { ManageCardComponent } from './manage-card/manage-card.component';
import { EmptyListComponent } from './empty-list/empty-list.component';
import { RouterModule } from '@angular/router';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { PipesModule } from '../pipes/pipes.module';
import { RequestFormComponent } from './request-form/request-form.component';
import { RequestCardComponent } from './request-card/request-card.component';

@NgModule({
  declarations: [AdminCardComponent, ManageCardComponent, EmptyListComponent, ImagePickerComponent,RequestFormComponent, RequestCardComponent],
  imports: [CommonModule, IonicModule, RouterModule, PipesModule],
  exports: [AdminCardComponent, ManageCardComponent, EmptyListComponent, ImagePickerComponent,RequestFormComponent,RequestCardComponent],
})
export class ComponentsModule {}
