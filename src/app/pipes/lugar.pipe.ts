import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lugar',
})
export class LugarPipe implements PipeTransform {
  transform(arreglo: any[], lugar: string): any[] {
    if (lugar === '' || lugar == undefined || lugar == 'todos') {
      return arreglo;
    } else {
      lugar = lugar.toLowerCase();

      return arreglo.filter((item) => {
        return item.location.toLowerCase().includes(lugar);
      });
    }
  }
}
