import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthService } from './services/auth.service';
import { AuthguardService } from './services/authguard.service';
import { CategoriesService } from './services/categories.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [ProductCardComponent, ProductQuantityComponent],
  imports: [CommonModule],
  exports: [ProductCardComponent, ProductQuantityComponent],
  providers: [
    AuthService,
    AuthguardService,
    CategoriesService,
    OrderService,
    ProductService,
    ShoppingCartService,
    UserService,
  ],
})
export class SharedModule {}
