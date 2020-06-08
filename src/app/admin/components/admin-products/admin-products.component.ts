import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ProductService } from 'shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'app/shared/models/product';
import { ProductTableService } from 'admin/services/product-table.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  @ViewChild('query') query: ElementRef;
  products: Product[];
  productsSubscription: Subscription;

  constructor(
    private productService: ProductService,
    public productTableService: ProductTableService
  ) {}

  ngOnInit(): void {
    this.productsSubscription = this.productService.getAll().subscribe((p) => {
      this.products = p;

      /* Sets the initial value of this.productTableService.filteredProducts Subject.
        If a filter input value is provided, any new product in firestore will be filtered through.
        This will prevent a reset of the table whenever a new product is save to firestore */
      this.filter(this.query.nativeElement.value);
    });
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  filter(query: string) {
    /* Will filter the value of this.productTableService.filteredProducts
     by query provided in the search bar */
    query
      ? this.productTableService.filteredProducts$.next(
          this.products.filter((p) =>
            p.title.toLowerCase().includes(query.toLowerCase())
          )
        )
      : this.productTableService.filteredProducts$.next(this.products);
  }
}
