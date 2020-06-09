import { Injectable } from '@angular/core';
import { Order } from 'shared/models/order';

@Injectable({
  providedIn: 'root',
})
export class AdminOrdersService {
  constructor() {}

  filterByID(orders: Order[], idQuery: string) {
    if (!idQuery) return orders;
    return orders.filter((orders) => {
      return orders.id.includes(idQuery);
    });
  }

  filterByCustomer(orders: Order[], customerQuery: string) {
    if (!customerQuery) return orders;
    return orders.filter((orders) => {
      return orders.id.includes(customerQuery);
    });
  }
}
