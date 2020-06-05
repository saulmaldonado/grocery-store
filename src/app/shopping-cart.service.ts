import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './models/product';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ShoppingCart } from './models/ShoppingCart';
import { ShoppingCartItem } from './models/ShoppingCartItem';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private db: AngularFirestore) {}

  /* For accessing the users cart from firestore. with the current angular/fire, you
   you cannot read subcollections, with id to document pairing (ex. {documentId: document}) 
   piping the results and mapping them to the desired format fixed the issue. This will make it
   easier to find a specific quantity of a product by searching by id instead of searching the
   original array or querying the store multiple times. */
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .collection('shopping-carts/' + cartId + '/items')
      .valueChanges()
      .pipe(
        map((item) => {
          let cart: { items: any; dateCreated: number } = {
            items: {},
            dateCreated: null,
          };
          this.db
            .collection('shopping-carts')
            .doc<{ dateCreated: number }>(cartId)
            .valueChanges()
            .pipe(first())
            .subscribe((d) => {
              cart.dateCreated = d.dateCreated;
            });
          item.forEach((i: { product: Product; quantity: number }) => {
            return Object.assign(cart.items, {
              [i.product.id]: { product: i.product, quantity: i.quantity },
            });
          });
          return new ShoppingCart(cart.items, cart.dateCreated);
        })
      );
  }

  /* After getting a cartId, an item document will be searched for in firestore path
  /shopping-carts/{cartId}/items/{itemid}. If doc does not exist, a new doc will be made
  containing the product object and initial quantity of 1. If the doc does exist the only 
  change made will be to increment or decrement the quantity by one. */
  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  // Creates a new cart in the database with a timestamp
  private create() {
    return this.db.collection('/shopping-carts').add({
      dateCreated: new Date().getTime(),
    });
  }

  /* firestore does not have a method for deleting entire collections.
    as a work around. An Observable of an array of documentId in the 
    collection is generated. Once subscribed all of the Id are are passed through 
    to doc(id).delete() */
  async clearCart() {
    let cartId = await this.getOrCreateCartId();

    this.db
      .collection('shopping-carts/' + cartId + '/items')
      .valueChanges()
      .pipe(
        first(),
        map((p) => {
          return p.map((p: any) => {
            return p.product.id;
          });
        })
      )
      .subscribe((productIdArray) => {
        productIdArray.forEach((productId: any) => {
          this.db
            .collection('shopping-carts/' + cartId + '/items')
            .doc(productId)
            .delete();
        });
      });
  }

  /* method will check for a card ID in localStorage (for not not signed in users) 
      if no cardId is found a new cart will be added in firestore */
  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      let res = await this.create();
      localStorage.setItem('cartId', res.id);

      return res.id;
    } else {
      return cartId;
    }
  }

  private getItem(cartId: string, productId: string) {
    return this.db
      .collection('shopping-carts')
      .doc(cartId)
      .collection('items')
      .doc(productId);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);

    item$
      .valueChanges()
      .pipe(first())
      .subscribe((item: any) => {
        let quantity = (item?.quantity || 0) + change;

        if (quantity === 0) {
          item$.delete();
        } else {
          item$.set({
            product: product,
            quantity: quantity,
          });
        }
      });
  }
}
