import { Injectable } from '@angular/core';
import { Product } from 'shared/models/product';
import { from, Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductTableService {
  // Default values for the table
  tablePage: number = 1;
  tablePageSize: number = 5;
  tableSize: number;

  filteredProducts$: BehaviorSubject<Product[]>;

  //a copy of the most recent snapshot of products used for sorting
  filteredProducts: Product[];

  constructor() {
    this.filteredProducts$ = new BehaviorSubject([]);

    this.filteredProducts$.subscribe((p: Product[]) => {
      this.tableSize = p.length;
      this.filteredProducts = p;
    });
  }

  /* Paginates products */
  get tableProducts$(): Observable<Product[]> {
    return this.filteredProducts$.pipe(
      map((p) => {
        return p.slice(
          (this.tablePage - 1) * this.tablePageSize,
          (this.tablePage - 1) * this.tablePageSize + this.tablePageSize
        );
      })
    );
  }

  /* Fire by the custom event 'sort' from SortableTable directive.  */
  onSort({ name, direction }) {
    this.filteredProducts$.next(
      this.filteredProducts.sort((a, b) => {
        if (name === 'title') {
          return this.sortByName(a, b, direction);
        } else {
          return this.sortByPrice(a, b, direction);
        }
      })
    );
  }

  sortByName(a, b, direction) {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return { asc: -1, desc: 1 }[direction];
    } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return { asc: 1, desc: -1 }[direction];
    } else {
      return 0;
    }
  }

  sortByPrice(a, b, direction) {
    if (a.price < b.price) {
      return { asc: -1, desc: 1 }[direction];
    } else if (a.price > b.price) {
      return { asc: 1, desc: -1 }[direction];
    } else {
      return 0;
    }
  }
}
