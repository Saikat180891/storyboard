import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { RightPanelService } from "./right-panel.service";

describe("RightPanelService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CookieService],
    })
  );

  it("should be created", () => {
    const service: RightPanelService = TestBed.get(RightPanelService);
    expect(service).toBeTruthy();
  });
});
