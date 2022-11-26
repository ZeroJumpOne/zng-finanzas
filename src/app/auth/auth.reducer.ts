import { createReducer, on } from '@ngrx/store';
import { Usuario, emptyUser } from '../models/usuario.model';
import * as actions from './auth.actions';

export interface State {
    user: Usuario
};

export const initialState: State = {
    user: emptyUser,
}

export const authReducer = createReducer(
  initialState,
  on(actions.setUser,   (state, { user }) => ({ ...state, user: {...user} })),
  on(actions.unSetUser, (state) => ({ ...state, user: { ...emptyUser } })),
);