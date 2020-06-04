import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute, RouteConfigLoadEnd } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  categories$: Observable<any>;
  products: Product[];
  currentCategory: string;
  filteredProducts: Product[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
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

    this.categories$ = this.categoriesService.getAll();
  }
}
