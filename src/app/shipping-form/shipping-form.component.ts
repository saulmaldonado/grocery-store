import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Order } from '../models/order';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { ShoppingCart } from '../models/ShoppingCart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input() cart: ShoppingCart;
  shipping: any = {};
  userId: string;
  userSub: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder({ ...order });
    this.router.navigate(['order-success', result.id]);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
