import { Component, OnInit, Input } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
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
  product?: Product = {
    title: '',
    price: null,
    category: '',
    imageUrl: '',
    id: '',
  };

  constructor(
    private categoriesService: CategoriesService,
    private productService: ProductService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.categories$ = this.categoriesService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService
        .get(this.id)
        .pipe(first())
        .subscribe((p) => (this.product = p));
    }
  }

  save() {
    this.productService
      .create(this.product)
      .then(() => {
        this.toast.success('Product has been added.');
        this.router.navigate(['/admin/products']);
      })
      .catch(() => {
        this.toast.error('An Error Occurred, product has not been saved.');
      });
  }
}
