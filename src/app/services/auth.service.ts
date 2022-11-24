import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';


import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(public auth: AngularFireAuth, private firestore: AngularFirestore) {}

  initAuthListener() {
    this.auth.authState.subscribe((fbUser) => {
      // console.log(fbUser);
      // console.log(fbUser?.uid);
      // console.log(fbUser?.email);
    });
  }

  crearUsuario(nombre: string, correo: string, clave: string) {
    //console.log(nombre, correo, clave);
    return this.auth
      .createUserWithEmailAndPassword(correo, clave)
      .then(( { user } ) => {

        console.log(user?.uid);

        const newUser = new Usuario( user?.uid, nombre, correo );

        console.log(newUser);

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
