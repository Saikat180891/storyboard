import { TestBed } from '@angular/core/testing';

import { DeleteTableService } from './delete-table.service';

describe('DeleteTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteTableService = TestBed.get(DeleteTableService);
    expect(service).toBeTruthy();
  });
});
