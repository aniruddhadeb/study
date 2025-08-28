import { TestBed } from '@angular/core/testing';

import { PracticeData } from './practice-data';

describe('PracticeData', () => {
  let service: PracticeData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticeData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
