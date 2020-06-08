import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ShoppingCart } from 'shared/models/ShoppingCart';
import { Order } from 'shared/models/order';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css'],
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input() cart: ShoppingCart;
  @Input() total?: number;

  constructor() {}

  ngOnInit(): void {}
}
