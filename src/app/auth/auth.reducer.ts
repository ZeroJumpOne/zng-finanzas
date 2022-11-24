import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import * as actions from './auth.actions';

const vacio = new Usuario( '0', '', '');

export interface State {
    user: Usuario
};

export const initialState: State = {
    user: vacio,
}

export const authReducer = createReducer(
  initialState,
  on(actions.setUser,   (state, { user }) => ({ ...state, user: {...user} })),
  on(actions.unSetUser, (state) => ({ ...state, user: { ...vacio } })),
);