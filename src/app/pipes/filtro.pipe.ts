import { Pipe, PipeTransform } from '@angular/core';
import { Mascota } from '../model/mascota.model';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  transform(mascotas: Mascota[], texto: string): any[] {
    if (texto === '' || texto == undefined) {
      return mascotas;
    } else {
      texto = texto.toLowerCase();

      return mascotas.filter((mascota) => {
        return mascota.nombre.toLowerCase().includes(texto);
      });
    }
  }
}
