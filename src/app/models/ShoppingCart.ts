import { ShoppingCartItem } from './ShoppingCartItem';

export class ShoppingCart {
  constructor(public items: ShoppingCartItem[], public dateCreated: number) {}

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) {
      count += this.items[productId].quantity;
    }
    return count;
  }
}
