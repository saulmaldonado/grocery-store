import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../models/order';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css'],
})
export class OrderSummaryComponent implements OnInit {
  @Input() order: Order;
  totalPrice: number;

  constructor() {}

  ngOnInit(): void {
    let total = 0;
    this.order.items.forEach((item) => {
      total += item.totalPrice;
    });
    this.totalPrice = total;
  }
}
