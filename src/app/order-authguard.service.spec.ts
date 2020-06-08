import { TestBed } from '@angular/core/testing';

import { OrderAuthguardService } from './shopping/services/order-authguard.service';

describe('OrderAuthguardService', () => {
  let service: OrderAuthguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderAuthguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
