import { TestBed } from "@angular/core/testing";

import { EditUserStoryService } from "./edit-user-story.service";

describe("EditUserStoryService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: EditUserStoryService = TestBed.get(EditUserStoryService);
    expect(service).toBeTruthy();
  });
});
