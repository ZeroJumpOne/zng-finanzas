import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';


import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userSubscription!: Subscription;

  constructor(public auth: AngularFireAuth, 
              private firestore: AngularFirestore,
              private store: Store<AppState>) {}

  initAuthListener() {
    this.auth.authState.subscribe((fbUser) => {
      // console.log(fbUser?.uid);

      if ( fbUser ) {

        this.userSubscription = this.firestore.doc(`${fbUser.uid}/usuario`).valueChanges()
        .subscribe( (firestoreUser) => {

          console.log('db:',firestoreUser);

          const cualUsuario = Usuario.fromFirestore( firestoreUser );

          this.store.dispatch( authActions.setUser( { user: cualUsuario } ));
          
        });

      } else {
        //no existe
        //console.log('llamar unset del usuario');
        this.userSubscription.unsubscribe();
        this.store.dispatch( authActions.unSetUser() );
      }
    });
  }

  crearUsuario(nombre: string, correo: string, clave: string) {
    //console.log(nombre, correo, clave);
    return this.auth
      .createUserWithEmailAndPassword(correo, clave)
      .then(( { user } ) => {

        //console.log(user?.uid);

        const newUser = new Usuario( user?.uid, nombre, correo );

        //console.log(newUser);

        return this.firestore.doc(`${ user?.uid }/usuario`).set( {...newUser} );
      });
  }

  loginUsuario(correo: string, clave: string) {
    return this.auth.signInWithEmailAndPassword(correo, clave);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth(): any {
    return this.auth.authState.pipe(map((fbUser) => fbUser != null));
  }
}
