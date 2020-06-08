import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyordersComponent } from './components/myorders/myorders.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { ProductsComponent } from './components/products/products.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { OrderComponent } from './components/order/order.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { Router, RouterModule } from '@angular/router';
import { AuthguardService } from 'shared/services/authguard.service';
import { OrderAuthguardService } from './services/order-authguard.service';

@NgModule({
  declarations: [
    MyordersComponent,
    ShoppingcartComponent,
    ProductsComponent,
    OrderSuccessComponent,
    CheckoutComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderComponent,
    OrderSummaryComponent,
    ProductFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      {
        path: 'orders',
        component: MyordersComponent,
        canActivate: [AuthguardService],
      },
      {
        path: 'orders/:id',
        component: OrderComponent,
        canActivate: [AuthguardService, OrderAuthguardService],
      },

      {
        path: 'shoppingcart',
        component: ShoppingcartComponent,
      },
      {
        path: 'order-success/:id',
        component: OrderSuccessComponent,
        canActivate: [AuthguardService],
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthguardService],
      },
    ]),
  ],
})
export class ShoppingModule {}
