import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lugar',
})
export class LugarPipe implements PipeTransform {
  transform(mascotas: any[], lugar: string): any[] {
    if (lugar === '' || lugar == undefined || lugar == 'todos') {
      return mascotas;
    } else {
      lugar = lugar.toLowerCase();

      return mascotas.filter((mascota) => {
        return mascota.ubicacionMascota.toLowerCase().includes(lugar);
      });
    }
  }
}
