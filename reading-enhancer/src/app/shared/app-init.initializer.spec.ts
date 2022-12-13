import { TestBed } from '@angular/core/testing';

import { AppInitializer } from './app-init.initializer';

describe('AppInitService', () => {
  let service: AppInitializer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppInitializer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
