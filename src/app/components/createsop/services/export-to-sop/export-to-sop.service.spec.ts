import { TestBed } from '@angular/core/testing';

import { ExportToSopService } from './export-to-sop.service';

describe('ExportToSopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportToSopService = TestBed.get(ExportToSopService);
    expect(service).toBeTruthy();
  });
});
