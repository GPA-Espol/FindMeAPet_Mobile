import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroPipe } from './filtro.pipe';
import { LugarPipe } from './lugar.pipe';

@NgModule({
  declarations: [FiltroPipe, LugarPipe],
  exports: [FiltroPipe, LugarPipe],
})
export class PipesModule {}
