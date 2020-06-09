import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Order } from 'shared/models/order';
import { AdminOrdersService } from 'admin/services/admin-orders.service';

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

  constructor(
    private ordersService: OrderService,
    private adminOrdersService: AdminOrdersService
  ) {}

  ngOnInit(): void {
    this.ordersService.getAllOrders().subscribe((orders) => {
      this.orders = orders;
      this.filter();
    });
  }

  filter() {
    this.filteredOrders = this.adminOrdersService.filterByCustomer(
      this.adminOrdersService.filterByID(
        this.orders,
        this.idQuery.nativeElement.value
      ),
      this.customerQuery.nativeElement.value
    );
  }
}
