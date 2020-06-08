import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { ShoppingcartComponent } from './shopping/components/shoppingcart/shoppingcart.component';
import { MyordersComponent } from './shopping/components/myorders/myorders.component';
import { LoginComponent } from './core/components/login/login.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from 'shared/services/auth.service';
import { AuthguardService } from 'shared/services/authguard.service';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { CheckoutComponent } from './shopping/components/checkout/checkout.component';
import { UserService } from 'shared/services/user.service';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { CategoriesService } from 'shared/services/categories.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ProductService } from 'shared/services/product.service';
import { SortableTableDirective } from 'admin/directives/sortable-table.directive';
import { ProductTableService } from 'admin/services/product-table.service';
import { ProductFilterComponent } from './shopping/components/products/product-filter/product-filter.component';
import { ProductCardComponent } from 'shared/components/product-card/product-card.component';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ProductQuantityComponent } from 'shared/components/product-quantity/product-quantity.component';
import { OrderService } from 'shared/services/order.service';
import { ShoppingCartSummaryComponent } from './shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shopping/components/shipping-form/shipping-form.component';
import { OrderComponent } from './shopping/components/order/order.component';
import { OrderSummaryComponent } from './shopping/components/order-summary/order-summary.component';
import { OrderAuthguardService } from './shopping/services/order-authguard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ShoppingcartComponent,
    MyordersComponent,
    LoginComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductsComponent,
    NotFoundComponent,
    OrderSuccessComponent,
    CheckoutComponent,
    ProductFormComponent,
    SortableTableDirective,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderComponent,
    OrderSummaryComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
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
      {
        path: 'admin',
        children: [
          {
            path: 'orders',
            component: AdminOrdersComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'products/new',
            component: ProductFormComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'products/:id',
            component: ProductFormComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
          {
            path: 'products',
            component: AdminProductsComponent,
            canActivate: [AuthguardService, AdminAuthGuardService],
          },
        ],
      },
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  providers: [
    AuthService,
    AuthguardService,
    OrderAuthguardService,
    UserService,
    AdminAuthGuardService,
    CategoriesService,
    ProductService,
    ProductTableService,
    ShoppingCartService,
    OrderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
