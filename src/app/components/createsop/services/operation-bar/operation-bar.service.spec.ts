import { TestBed } from '@angular/core/testing';

import { OperationBarService } from './operation-bar.service';

describe('OperationBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperationBarService = TestBed.get(OperationBarService);
    expect(service).toBeTruthy();
  });
});
