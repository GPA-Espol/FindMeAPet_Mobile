import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro',
})
export class FiltroPipe implements PipeTransform {
  transform(arreglo: any[], texto: string): any[] {
    //console.log(arreglo);
    if (texto === '' || texto == undefined) {
      console.log('F');
      
      return arreglo;
    } else {
      console.log(texto);
      
      texto = texto.toLowerCase();
      console.log('A');
      return arreglo.filter((item) => {
        return item.name.toLowerCase().includes(texto);
      });
    }
  }
}
