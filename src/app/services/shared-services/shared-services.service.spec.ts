import { TestBed } from '@angular/core/testing';

import { SharedServicesService } from './shared-services.service';

describe('SharedServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedServicesService = TestBed.get(SharedServicesService);
    expect(service).toBeTruthy();
  });
});
