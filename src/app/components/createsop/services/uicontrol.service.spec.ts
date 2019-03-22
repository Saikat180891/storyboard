import { TestBed } from "@angular/core/testing";

import { UicontrolService } from "./uicontrol.service";

describe("UicontrolService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: UicontrolService = TestBed.get(UicontrolService);
    expect(service).toBeTruthy();
  });
});
