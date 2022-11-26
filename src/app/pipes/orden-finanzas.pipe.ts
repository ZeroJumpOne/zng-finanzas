import { Pipe, PipeTransform } from '@angular/core';
import { Finanzas } from '../models/finanzas.model';

@Pipe({
  name: 'ordenFinanzas'
})
export class OrdenFinanzasPipe implements PipeTransform {

  transform(items: Finanzas[]): Finanzas[] {
    return items.sort( ( a,b ) => {
      if(a.tipo === 'Ingreso') {
        return 0;
      } else {
        return 1;
      }

    });
  }

}
