import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    private categoriesService: CategoriesService,
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router
  ) {
    this.categories$ = categoriesService.getCategories();
  }

  save(product) {
    this.productService
      .create(product.value)
      .then(() => {
        this.toast.success('Product has been added.');
        this.router.navigate(['/admin/products']);
      })
      .catch(() => {
        this.toast.error('An Error Occurred, product has not been saved.');
      });
  }

  ngOnInit(): void {}
}
