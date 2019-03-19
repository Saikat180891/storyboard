import { TestBed } from "@angular/core/testing";

import { CreateUserstoryService } from "./create-userstory.service";

describe("CreateUserstoryService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: CreateUserstoryService = TestBed.get(CreateUserstoryService);
    expect(service).toBeTruthy();
  });
});
