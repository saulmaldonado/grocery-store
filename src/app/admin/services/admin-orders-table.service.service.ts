import { Injectable } from '@angular/core';
import { TableService } from 'shared/models/tableService';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';

@Injectable({
  providedIn: 'root',
})
export class AdminOrdersTableService {
  tablePage: number = 1;
  tablePageSize: number = 5;
  tableSize: number;
  data$: BehaviorSubject<Order[]>;

  constructor(private ordersService: OrderService) {
    this.ordersService.getAllOrders().subscribe((orders) => {
      this.tableSize = orders.length;
    });

    this.data$ = new BehaviorSubject([]);
  }

  get pageData$() {
    return this.data$.pipe(
      map((array) => {
        return array.slice(
          (this.tablePage - 1) * this.tablePageSize,
          (this.tablePage - 1) * this.tablePageSize + this.tablePageSize
        );
      })
    );
  }
}
