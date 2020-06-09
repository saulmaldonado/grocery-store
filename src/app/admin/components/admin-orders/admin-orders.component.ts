import { Component, OnInit } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Observable } from 'rxjs';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  constructor(private ordersService: OrderService) {}

  ngOnInit(): void {
    this.orders$ = this.ordersService.getAllOrders();
  }
}
