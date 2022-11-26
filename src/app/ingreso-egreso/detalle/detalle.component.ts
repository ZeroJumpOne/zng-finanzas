import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Finanzas } from 'src/app/models/finanzas.model';
import { FinanzasService } from 'src/app/services/finanzas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  bussiness: Finanzas[] = [];
  bussSubscription!: Subscription;

  constructor(private store: Store<AppState>,
              private finanzasService: FinanzasService) { }

  ngOnInit(): void {

    this.bussSubscription = this.store.select('finanzas').subscribe( ({ items }) => {

      if (items.length > 0) {
        console.log(items);
        this.bussiness = items;
      }
    });
  }

  ngOnDestroy(): void {
    
    this.bussSubscription.unsubscribe();
  }

  borrar(uid: any): void {
    //console.log('Eliminando:', uid);
    this.finanzasService.eliminarFinanza( uid )
    .then ( succ => {
      Swal.fire('Borrado', `Item borrado ${uid}`, 'success');
    })
    .catch(error => {
      Swal.fire('Error', error.message, 'error');
    });
  }

}
