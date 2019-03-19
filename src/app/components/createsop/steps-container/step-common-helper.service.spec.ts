import { TestBed } from "@angular/core/testing";

import { StepCommonHelperService } from "./step-common-helper.service";

describe("StepCommonHelperService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: StepCommonHelperService = TestBed.get(
      StepCommonHelperService
    );
    expect(service).toBeTruthy();
  });

  describe("getStepNumber()", () => {
    it("should format step number correctly", () => {
      const service: StepCommonHelperService = TestBed.get(
        StepCommonHelperService
      );
      const stepNumber = service.getStepNumber(0, 0);
      expect(stepNumber).toBe("1.1");
    });
  });
});
