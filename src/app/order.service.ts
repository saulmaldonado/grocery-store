import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentReference,
  CollectionReference,
} from '@angular/fire/firestore';
import { ShoppingCartService } from './shopping-cart.service';
import * as firebase from 'firebase';
import { Order } from './models/order';
import {
  ActivatedRoute,
  ParamMap,
  Params,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFirestore,
    private shoppingCartService: ShoppingCartService
  ) {}

  async placeOrder(order): Promise<DocumentReference> {
    let result = await this.db.collection('orders').add(order);
    this.shoppingCartService.clearCart();

    return result;
  }

  getOrders() {
    return this.db.collection('orders');
  }

  getOrdersByUser(userId: string) {
    return this.db.collection('orders', (ref) =>
      ref.where('userId', '==', userId)
    );
  }

  getOrderById(route: ActivatedRoute) {
    return this.getOrderId(route).pipe(
      switchMap((orderId) => {
        return this.db
          .collection<Order>('orders', (ref) =>
            this.queryOrderById(orderId, ref)
          )
          .valueChanges({ idField: 'id' });
      }),
      map((o: Order[]) => {
        return o[0];
      })
    );
  }

  private getOrderId(route: ActivatedRoute) {
    return route.paramMap.pipe(
      map((p) => {
        return p.get('id');
      })
    );
  }

  private queryOrderById(id: string, ref: CollectionReference) {
    return ref.where(firebase.firestore.FieldPath.documentId(), '==', id);
  }
}
