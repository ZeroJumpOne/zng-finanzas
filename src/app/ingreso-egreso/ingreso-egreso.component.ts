import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Finanzas } from '../models/finanzas.model';
import { FinanzasService } from '../services/finanzas.service';
import * as uiActions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  finanzasForm!: FormGroup;
  tipo: string = 'Ingreso';
  loading: boolean = false;
  uiSuscription!: Subscription;

  constructor(private fb: FormBuilder,
              private finanazasService: FinanzasService,
              private store: Store<AppState>) { }

  ngOnInit(): void {

    this.finanzasForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: [0.00, Validators.required],
    });

    this.uiSuscription = this.store.select('ui').subscribe( ui => {
      this.loading = ui.isLoading;
      //console.log('ui loading', ui.isLoading);
    })
  }

  ngOnDestroy(): void {
    this.uiSuscription?.unsubscribe();
  }

  guardar(): void {

    if (this.finanzasForm.invalid) { return; }

    //console.log(this.finanzasForm.value);
    //console.log(this.tipo);

    const { descripcion, monto } = this.finanzasForm.value;

    const finanzas = new Finanzas(descripcion, monto, this.tipo);

    this.store.dispatch( uiActions.isLoading() );

    this.finanazasService.crearFinanza(finanzas)
    .then( (ref) => {

      //console.log('coleccion items', ref);
      Swal.fire('Registro creado', descripcion, 'success');

      this.finanzasForm.reset();

      this.store.dispatch( uiActions.stopLoading() );
    })
    .catch( error => {

      //console.warn(error);
      Swal.fire('Error', error.message, 'error');

      this.store.dispatch( uiActions.stopLoading() );
    });    
  }

  onClickTipo(): void {

    this.tipo === 'Ingreso' ? this.tipo = 'Egreso' : this.tipo = 'Ingreso';

  }

}
