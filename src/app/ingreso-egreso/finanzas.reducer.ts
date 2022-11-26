import { createReducer, on } from '@ngrx/store';
import { Finanzas } from '../models/finanzas.model';
import * as actions from './finanzas.actions';

export interface State {
    items: Finanzas[]
}

export const initialState: State = {
    items: []
};

export const finanzasReducer = createReducer(
  initialState,
  on(actions.setItems,   (state, { items }) => ({...state, items: [...items] })),
  on(actions.unSetItems, (state) => ({...state, items: []})),
);