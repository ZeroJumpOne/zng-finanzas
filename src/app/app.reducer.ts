import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as bussines from './ingreso-egreso/finanzas.reducer';


export interface AppState {
   ui: ui.State,
   user: auth.State,
   finanzas: bussines.State,   
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer,
   finanzas: bussines.finanzasReducer
}