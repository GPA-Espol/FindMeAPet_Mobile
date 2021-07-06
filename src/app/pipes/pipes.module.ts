import { NgModule } from '@angular/core';
import { FiltroPipe } from './name.pipe';
import { LugarPipe } from './location.pipe';
import { AgePipe } from './age.pipe';

@NgModule({
  declarations: [FiltroPipe, LugarPipe, AgePipe],
  exports: [FiltroPipe, LugarPipe, AgePipe],
})
export class PipesModule {}
