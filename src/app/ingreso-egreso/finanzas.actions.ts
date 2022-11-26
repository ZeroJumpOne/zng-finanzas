import { createAction, props } from '@ngrx/store';
import { Finanzas } from '../models/finanzas.model';

export const setItems   = createAction(
    '[Finanzas] Set Items',
    props<{ items: Finanzas[] }>()
);

export const unSetItems = createAction('[Finanzas] UnSet Items');
