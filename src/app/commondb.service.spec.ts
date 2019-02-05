import { TestBed } from '@angular/core/testing';

import { CommondbService } from './commondb.service';

describe('CommondbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommondbService = TestBed.get(CommondbService);
    expect(service).toBeTruthy();
  });
});
