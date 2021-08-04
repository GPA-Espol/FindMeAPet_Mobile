import { NgModule } from '@angular/core';
import { FiltroPipe } from './name.pipe';
import { LugarPipe } from './location.pipe';
import { AgePipe } from './age.pipe';
import { DateFormatPipe } from './date-format.pipe';

@NgModule({
  declarations: [FiltroPipe, LugarPipe, AgePipe, DateFormatPipe],
  exports: [FiltroPipe, LugarPipe, AgePipe, DateFormatPipe],
})
export class PipesModule {}
