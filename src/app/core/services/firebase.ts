import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Firebase {

  constructor(
  private afs: AngularFirestore,
  ) { }

   getFBUser(id:string): any {
    let itemDoc = this.afs.collection('/users').doc(id);
    return itemDoc.valueChanges({ idField: 'id' }).pipe(take(1));
  }
}
