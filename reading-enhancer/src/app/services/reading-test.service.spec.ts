import { TestBed } from '@angular/core/testing';

import { ReadingTestService } from './reading-test.service';

describe('ReadingTestService', () => {
  let service: ReadingTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReadingTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
