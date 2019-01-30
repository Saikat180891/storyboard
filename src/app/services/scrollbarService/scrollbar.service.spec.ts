import { TestBed } from '@angular/core/testing';

import { ScrollbarService } from './scrollbar.service';

describe('ScrollbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrollbarService = TestBed.get(ScrollbarService);
    expect(service).toBeTruthy();
  });
});
