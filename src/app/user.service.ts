import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  save(user: firebase.User) {
    return this.db
      .collection('users')
      .doc(user.uid)
      .set({
        name: user.displayName,
        email: user.email,
      })
      .then(() => {
        console.log('user has been successfully saved to the database.');
      })
      .catch(() => {
        console.error('an error has occurred');
      });
  }
}
