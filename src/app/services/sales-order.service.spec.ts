import { TestBed, inject } from '@angular/core/testing';

import { salesOrderService } from './sales-order.service';

describe('salesOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [salesOrderService]
    });
  });

  it('should be created', inject([salesOrderService], (service: salesOrderService) => {
    expect(service).toBeTruthy();
  }));
});
