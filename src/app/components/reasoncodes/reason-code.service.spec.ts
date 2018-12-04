import { TestBed } from '@angular/core/testing';

import { ReasonCodeService } from './reason-code.service';

describe('ReasonCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReasonCodeService = TestBed.get(ReasonCodeService);
    expect(service).toBeTruthy();
  });
});
