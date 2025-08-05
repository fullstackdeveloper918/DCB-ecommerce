import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Firebase {
  constructor(private injector: EnvironmentInjector) {
  }

  getFBUser(id: string) {
    if (!id) {
      console.error('User ID is undefined or null');
      throw new Error('User ID is required');
    }

    console.log('Fetching user with ID:', id);

    return runInInjectionContext(this.injector, () => {
      const afs = inject(AngularFirestore);
      const itemDoc = afs.collection('users').doc(id);
      return itemDoc.valueChanges({ idField: 'id' }).pipe(take(1));
    });
  }
}
