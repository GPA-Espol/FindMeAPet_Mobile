import { Pipe, PipeTransform } from '@angular/core';
import { Mascota } from 'src/app/model/mascota.model';

/**
 * Aux class to manage the filter of pets by their ubication.
 * @category Pipes
 */
@Pipe({
  name: 'lugar',
})
export class LugarPipe implements PipeTransform {
  /**
   * Filter the array of pets of a specific ubication,
   * @param {Mascota[]} mascotas array of pets to filter.
   * @param {string} lugar The ubication to filter the pets.
   * @return {Mascota[]} The array of pets filtered
   */
  transform(mascotas: Mascota[], lugar: string): Mascota[] {
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
