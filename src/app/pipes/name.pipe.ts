import { Pipe, PipeTransform } from '@angular/core';
import { Mascota } from '../model/mascota.model';

/** Aux class to manage the filter of pets by their names.
 * @category Pipes
 */
@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  /**
   * Filter the array of all pets whose name includes an specific string,
   * @param {Mascota[]} mascotas array of pets to filter.
   * @param {string} texto The string to filter the pet's names.
   * @return {Mascota[]} The array of pets filtered
   */
  transform(mascotas: Mascota[], texto: string): Mascota[] {
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
