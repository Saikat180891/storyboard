import { TestBed } from "@angular/core/testing";

import { SopApiService } from "./sop-api.service";

describe("SopApiService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: SopApiService = TestBed.get(SopApiService);
    expect(service).toBeTruthy();
  });
});
