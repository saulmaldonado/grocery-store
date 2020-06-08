import { TestBed } from '@angular/core/testing';

import { ProductTableService } from 'admin/services/product-table.service';

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
