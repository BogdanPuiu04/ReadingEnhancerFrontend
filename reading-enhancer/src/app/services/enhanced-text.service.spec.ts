import { TestBed } from '@angular/core/testing';

import { EnhancedTextService } from './enhanced-text.service';

describe('EnhancedTextService', () => {
  let service: EnhancedTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnhancedTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
