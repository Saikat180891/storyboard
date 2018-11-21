import { TestBed } from '@angular/core/testing';

import { AddScreenService } from './add-screen.service';

describe('AddScreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddScreenService = TestBed.get(AddScreenService);
    expect(service).toBeTruthy();
  });
});
