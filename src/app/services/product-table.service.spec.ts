import { TestBed } from '@angular/core/testing';

import { ProductTableService } from './product-table.service';

describe('ProductTableService', () => {
  let service: ProductTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
