import { TestBed } from '@angular/core/testing';

import { AuthguardService } from 'shared/services/authguard.service';

describe('AuthguardService', () => {
  let service: AuthguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
