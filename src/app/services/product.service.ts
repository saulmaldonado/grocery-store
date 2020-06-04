import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProductTableService } from './product-table.service';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private db: AngularFirestore,
    private productTableService: ProductTableService
  ) {}

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

  update(product, id) {
    return this.db.collection('products').doc(id).set(product, { merge: true });
  }

  delete(id) {
    return this.db.collection('products').doc(id).delete();
  }
}
