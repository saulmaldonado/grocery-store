import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from 'shared/services/categories.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
  @Input() currentCategory;
  categories$: Observable<any>;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.getAll();
  }
}
