import { TestBed } from "@angular/core/testing";

import { LeftPanelService } from "./left-panel.service";

describe("LeftPanelService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: LeftPanelService = TestBed.get(LeftPanelService);
    expect(service).toBeTruthy();
  });
});
