import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { ReasoncodeModule } from "../reasoncode.module";
import { EditUserStoryService } from "./edit-user-story.service";

describe("EditUserStoryService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ReasoncodeModule, HttpClientTestingModule],
      providers: [CookieService],
    })
  );

  it("should be created", () => {
    const service: EditUserStoryService = TestBed.get(EditUserStoryService);
    expect(service).toBeTruthy();
  });
});
