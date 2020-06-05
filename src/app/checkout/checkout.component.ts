import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/ShoppingCart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../services/auth.service';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  shipping: any = {};
  cart: ShoppingCart;
  userId: string;
  cartSub: Subscription;
  userSub: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();

    this.cartSub = cart$.subscribe((cart) => (this.cart = cart));

    this.userSub = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder({ ...order });
    this.router.navigate(['order-success', result.id]);
  }
}
