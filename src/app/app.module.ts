import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SortableTableDirective } from 'admin/directives/sortable-table.directive';
import { ProductTableService } from 'admin/services/product-table.service';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ToastrModule } from 'ngx-toastr';
import { AuthguardService } from 'shared/services/authguard.service';

import { environment } from '../environments/environment';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CheckoutComponent } from './shopping/components/checkout/checkout.component';
import { MyordersComponent } from './shopping/components/myorders/myorders.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { OrderSummaryComponent } from './shopping/components/order-summary/order-summary.component';
import { OrderComponent } from './shopping/components/order/order.component';
import { ProductFilterComponent } from './shopping/components/products/product-filter/product-filter.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShippingFormComponent } from './shopping/components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingcartComponent } from './shopping/components/shoppingcart/shoppingcart.component';
import { OrderAuthguardService } from './shopping/services/order-authguard.service';
import { SharedModule } from 'shared/shared.module';

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
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderComponent,
    OrderSummaryComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
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
    OrderAuthguardService,
    AdminAuthGuardService,
    ProductTableService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
