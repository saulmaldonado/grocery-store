import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  products: Product[];
  currentCategory: string;
  filteredProducts: Product[];
  cart: any;
  cart$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCart: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = (await this.shoppingCart.getCart()).subscribe((cart) => {
      this.cart = cart;
    });

    this.productService
      .getAll()
      .pipe(
        switchMap((p) => {
          this.products = p;
          return this.route.queryParamMap;
        })
      )
      .subscribe((p) => {
        this.currentCategory = p.get('category');

        this.filteredProducts = this.currentCategory
          ? this.products.filter((p) => {
              return p.category === this.currentCategory;
            })
          : this.products;
      });
  }

  ngOnDestroy() {
    this.cart$.unsubscribe();
  }
}
