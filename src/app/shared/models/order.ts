import { ShoppingCart } from './ShoppingCart';
import { orderItem } from './orderItem';

export class Order {
  id: string;
  datePlaced: number;
  items: orderItem[];

  constructor(
    public userId: string,
    public shipping: any,
    shoppingCart: ShoppingCart
  ) {
    this.datePlaced = new Date().getTime();

    this.items = shoppingCart.items.map((i) => {
      return {
        product: {
          title: i.product.title,
          imageUrl: i.product.imageUrl,
          price: i.product.price,
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,
      };
    });
  }
}
