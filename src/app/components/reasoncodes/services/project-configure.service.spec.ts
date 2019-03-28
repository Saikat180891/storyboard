import { TestBed } from "@angular/core/testing";

import { ProjectConfigureService } from "./project-configure.service";

describe("ProjectConfigureService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: ProjectConfigureService = TestBed.get(
      ProjectConfigureService
    );
    expect(service).toBeTruthy();
  });
});
