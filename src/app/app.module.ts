import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AdminModule } from 'admin/admin.module';
import { SortableTableDirective } from 'admin/directives/sortable-table.directive';
import { COREModule } from 'core/core.module';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from 'shared/shared.module';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { OrderAuthguardService } from './shopping/services/order-authguard.service';
import { ShoppingModule } from './shopping/shopping.module';

@NgModule({
  declarations: [AppComponent, NotFoundComponent, SortableTableDirective],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    COREModule,
    ShoppingModule,
    ToastrModule.forRoot(),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    FormsModule,
    CustomFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: '**', component: NotFoundComponent },
    ]),
  ],
  providers: [OrderAuthguardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
