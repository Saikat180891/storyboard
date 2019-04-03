import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { SidebarService } from "./sidebar.service";

describe("SidebarService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CookieService],
    })
  );

  it("should be created", () => {
    const service: SidebarService = TestBed.get(SidebarService);
    expect(service).toBeTruthy();
  });
});
