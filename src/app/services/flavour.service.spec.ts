import { TestBed, inject } from '@angular/core/testing';

import { FlavourService } from './flavour.service';

describe('FlavourService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlavourService]
    });
  });

  it('should be created', inject([FlavourService], (service: FlavourService) => {
    expect(service).toBeTruthy();
  }));
});
