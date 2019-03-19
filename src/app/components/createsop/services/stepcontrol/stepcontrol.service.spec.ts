import { TestBed } from "@angular/core/testing";

import { StepcontrolService } from "./stepcontrol.service";

describe("StepcontrolService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: StepcontrolService = TestBed.get(StepcontrolService);
    expect(service).toBeTruthy();
  });
});
