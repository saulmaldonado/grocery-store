import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFirestore) {}

  create(product: Product) {
    return this.db.collection('products').add(product);
  }

  getAll(): Observable<Product[]> {
    /* value changes takes an optional parameter that will return the UID from firestore */
    return this.db
      .collection('products')
      .valueChanges({ idField: 'id' }) as Observable<Product[]>;
  }

  get(productId): Observable<Product> {
    return this.db
      .collection('products')
      .doc(productId)
      .valueChanges() as Observable<Product>;
  }
}
