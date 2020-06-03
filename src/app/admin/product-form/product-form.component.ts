import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(private categoriesService: CategoriesService) {
    this.categories$ = categoriesService.getCategories();
  }

  ngOnInit(): void {}
}
