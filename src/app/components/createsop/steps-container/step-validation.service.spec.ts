import { TestBed } from "@angular/core/testing";

import { StepValidationService } from "./step-validation.service";

describe("StepValidationService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: StepValidationService = TestBed.get(StepValidationService);
    expect(service).toBeTruthy();
  });
});
