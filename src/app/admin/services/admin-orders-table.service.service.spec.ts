import { TestBed } from '@angular/core/testing';

import { AdminOrdersTableService } from './admin-orders-table.service.service';

describe('AdminOrdersTable.ServiceService', () => {
  let service: AdminOrdersTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOrdersTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
