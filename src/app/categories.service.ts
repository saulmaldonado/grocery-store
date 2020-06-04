import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Categories } from './models/categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  // categoriesMap: { id: string; name: string } | {} = {};

  constructor(private db: AngularFirestore) {}

  getAll() {
    return this.db
      .collection('categories', (catRef) => catRef.orderBy('name', 'asc'))
      .valueChanges({ idField: 'id' });
  }
}
