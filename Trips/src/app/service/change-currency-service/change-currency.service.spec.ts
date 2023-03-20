import { TestBed } from '@angular/core/testing';

import { ChangeCurrencyService } from './change-currency.service';

describe('ChangeCurrencyService', () => {
  let service: ChangeCurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeCurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
