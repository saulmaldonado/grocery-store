import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from 'shared/services/categories.service';
import { ProductService } from 'shared/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'app/shared/models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$;

  // optional id field from route parameters /admin/products/:id
  id?: string;

  // optional product field that contains the product object
  product: Product = {
    title: '',
    price: null,
    category: '',
    imageUrl: '',
  };

  constructor(
    private categoriesService: CategoriesService,
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService
        .get(this.id)
        .pipe(first())
        .subscribe((p) => (this.product = p));
    }
  }

  save() {
    // If the page has an id parameter 'admin/products/:id' the update method will be called
    if (this.id) {
      this.productService
        .update(this.product, this.id)
        .then(() => {
          this.toast.success('Product has been successfully updated.');
        })
        .catch(() => {
          this.toast.error(
            'An error occurred. The product has not been updated.'
          );
        });
    } else {
      // if the id parameter is not present the product will be saved as a new product
      this.productService
        .create(this.product)
        .then(() => {
          this.toast.success('Product has been added.');
        })
        .catch(() => {
          this.toast.error('An Error Occurred, product has not been saved.');
        });
    }

    /* upon saving, the user will NOT wait for the promise to resolve. 
    The user will be redirected to AdminProducts and will receive a toast notification */
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService
        .delete(this.id)
        .then(() => {
          this.toast.success('Product has been deleted.');
        })
        .catch(() => {
          this.toast.error('An Error Occurred, product has not been deleted.');
        });

      /* upon saving, the user will NOT wait for the promise to resolve. 
        The user will be redirected to AdminProducts and will receive a toast notification */
      this.router.navigate(['/admin/products']);
    }
  }
}
