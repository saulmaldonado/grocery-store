import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './models/product';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFirestore) {}

  // Creates a new cart in the database with a timestamp
  private create() {
    return this.db.collection('/shopping-carts').add({
      dateCreated: new Date().getTime(),
    });
  }

  // For accessing the users cart in firestore
  private getCart(id: string) {
    return this.db.collection('shopping-carts').doc(id).valueChanges();
  }

  /* method will check for a card ID in localStorage (for not not signed in users) 
      if no cardId is found a new cart will be added in firestore */
  private async getOrCreateCartId(product) {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let res = await this.create();
      localStorage.setItem('cartId', res.id);

      return res.id;
    } else {
      return cartId;
    }
  }

  /* After getting a cartId, an item document will be searched for in firestore path
  /shopping-carts/{cartId}/items/{itemid}. If doc does not exist, a new doc will be made
  containing the product object and initial quantity of 1. If the doc does exist the quantity
  be incremented */
  async addToCart(product: Product) {
    let cartId = await this.getOrCreateCartId(product);
    let item$ = this.db
      .collection('shopping-carts')
      .doc(cartId)
      .collection('items')
      .doc(product.id);

    item$
      .valueChanges()
      .pipe(first())
      .subscribe((item: any) => {
        if (item) {
          item$.set({ quantity: item.quantity + 1 }, { merge: true });
        } else {
          item$.set({ product: product, quantity: 1 });
        }
      });
  }
}
