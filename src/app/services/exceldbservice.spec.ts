import { TestBed } from '@angular/core/testing';

import { Exceldbservice } from './exceldbservice';

describe('Exceldbservice', () => {
  let service: Exceldbservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Exceldbservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
