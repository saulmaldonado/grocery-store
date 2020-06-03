import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFirestore) {}

  create(product: Product) {
    return this.db.collection('products').add(product);
  }

  getAll() {
    return this.db.collection('products').valueChanges({ idField: 'id' });
  }
}
