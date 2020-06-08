import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'shared/services/order.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Order } from 'shared/models/order';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  id: string;
  order$: Observable<Order>;
  orderSub: Subscription;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.order$ = this.orderService.getOrderById(this.route);
  }
}
