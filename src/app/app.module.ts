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
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { MyordersComponent } from './myorders/myorders.component';
import { LoginComponent } from './login/login.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductsComponent } from './products/products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { AuthguardService } from './authguard.service';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoriesService } from './categories.service';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ProductService } from './services/product.service';
import { SortableTableDirective } from './directive/sortable-table.directive';
import { ProductTableService } from './services/product-table.service';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product/product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';

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
        path: 'shoppingcart',
        component: ShoppingcartComponent,
        canActivate: [AuthguardService],
      },
      {
        path: 'order-success',
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
    UserService,
    AdminAuthGuardService,
    CategoriesService,
    ProductService,
    ProductTableService,
    ShoppingCartService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
