import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  save(user: firebase.User) {
    return this.db
      .collection('users')
      .doc(user.uid)
      .set(
        {
          name: user.displayName,
          email: user.email,
        },
        { merge: true }
      )
      .then(() => {
        console.log('user has been successfully saved to the database.');
      })
      .catch(() => {
        console.error('an error has occurred');
      });
  }

  getUser(uid: string) {
    return this.db.collection('users').doc(uid).valueChanges() as Observable<
      AppUser
    >;
  }
}
