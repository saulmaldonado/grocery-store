import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { ShoppingCartService } from './shopping-cart.service';

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
}
