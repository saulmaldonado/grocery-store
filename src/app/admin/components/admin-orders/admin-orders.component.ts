import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  filteredOrders: Order[];
  orders: Order[];

  @ViewChild('idQuery') idQuery: ElementRef;
  @ViewChild('customerQuery') customerQuery: ElementRef;

  constructor(private ordersService: OrderService) {}

  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe((orders) => {
      this.orders = orders;
      this.filter();
    });
  }

  filter() {
    this.filteredOrders = this.filterByCustomer(this.filterByID(this.orders));
  }

  private filterByID(orders: Order[]) {
    if (!this.idQuery) return orders;
    return orders.filter((orders) => {
      return orders.id.includes(this.idQuery.nativeElement.value);
    });
  }

  private filterByCustomer(orders: Order[]) {
    if (!this.customerQuery) return orders;
    return orders.filter((orders) => {
      return orders.id.includes(this.customerQuery.nativeElement.value);
    });
  }
}
