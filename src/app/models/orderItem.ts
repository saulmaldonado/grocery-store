export interface orderItem {
  product: {
    title: string;
    imageUrl: string;
    price: number;
  };
  quantity: number;
  totalPrice: number;
}
