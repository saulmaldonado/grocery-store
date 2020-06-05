import { ShoppingCartItem } from './ShoppingCartItem';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(
    public itemsMap: { [productId: string]: ShoppingCartItem },
    public dateCreated: number
  ) {
    /* Will create an an iterable for all of the products in the cart for the template */
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }

  get productIds() {
    return Object.keys(this.items);
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items) {
      count += this.items[productId].quantity;
    }
    return count;
  }
}
