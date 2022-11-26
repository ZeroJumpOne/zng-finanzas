import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Finanzas } from 'src/app/models/finanzas.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  bussSubcription!: Subscription;

  ingresos: number = 0;
  egresos: number = 0;

  totalIngresos: number = 0;
  totalEgresos: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.bussSubcription = this.store.select('finanzas').subscribe( ( { items } ) => {
      //console.log(items);
      this.generarEstadisticas( items );
    })
  }

  ngOnDestroy(): void {
    this.bussSubcription.unsubscribe();    
  }

  generarEstadisticas( items: Finanzas[]) {
    if (items.length > 0) {
      console.log(items);

      const onlyEgresos = items.filter( item => item.tipo === 'Egreso');
      this.totalEgresos = onlyEgresos.reduce( (a = 0, item2) => a + item2.monto, 0);
      this.egresos = items.length;
      //console.log('Solo egresos',onlyEgresos);

      const onlyIngresos = items.filter( item => item.tipo === 'Ingreso');
      this.totalIngresos = onlyIngresos.reduce( (a = 0, item) => a + item.monto, 0);
      this.ingresos = onlyIngresos.length;
      //console.log('Solo ingresos',onlyIngresos);


    }
  }

}
