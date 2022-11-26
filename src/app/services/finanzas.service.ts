import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { map } from 'rxjs';
import { Finanzas } from '../models/finanzas.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FinanzasService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthService) { }

  crearFinanza( finanzas: Finanzas) {

    const uid = this.authService.user.uid;

    delete finanzas.uid;

    //console.log('crearFinanza', finanzas);

    return this.firestore.doc(`${uid}/finanzas`).collection('items')
    .add( { ...finanzas } );
  }

  eliminarFinanza(uidItem: string) {
    const uid = this.authService.user.uid;

    return this.firestore.doc(`${uid}/finanzas/items/${uidItem}`).delete();
  }

  initFinanzasListener(uid: string) {

    return this.firestore.collection(`${uid}/finanzas/items`)
    .snapshotChanges()
    .pipe(
      map( snapshot => {
        return snapshot.map( doc => {
          //console.log(doc.payload.doc.data());
          return { uid: doc.payload.doc.id, ...doc.payload.doc.data() as any }
        });
      })
    );
  }
}
