import { TestBed, inject } from '@angular/core/testing';

import { ProductDetailGuard } from './product-guard.service';

describe('ProductGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductDetailGuard]
    });
  });

  it('should be created', inject([ProductDetailGuard], (service: ProductDetailGuard) => {
    expect(service).toBeTruthy();
  }));
});
