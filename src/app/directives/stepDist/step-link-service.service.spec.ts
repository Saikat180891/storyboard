import { TestBed } from "@angular/core/testing";

import { StepLinkServiceService } from "./step-link-service.service";

describe("StepLinkServiceService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: StepLinkServiceService = TestBed.get(StepLinkServiceService);
    expect(service).toBeTruthy();
  });
});
