import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { LugarPipe } from './lugar.pipe';
import { AgePipe } from './age.pipe';

@NgModule({
  declarations: [FiltroPipe, LugarPipe, AgePipe],
  exports: [FiltroPipe, LugarPipe,AgePipe],
})
export class PipesModule {}
