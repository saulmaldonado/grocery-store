import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private db: AngularFirestore) {}

  getCategories() {
    return this.db
      .collection('categories', (catRef) => catRef.orderBy('name', 'asc'))
      .get()
      .pipe(
        map((c) => {
          return c.docs;
        }),
        map((c) => {
          return c.map((c) => c.data());
        })
      );
  }
}
