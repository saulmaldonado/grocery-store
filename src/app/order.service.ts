import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private db: AngularFirestore) {}

  storeOrder(order) {
    this.db.collection('orders').add(order);
  }
}
