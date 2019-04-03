import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { ReasonCodeService } from "./reason-code.service";
import { ReasoncodeModule } from "./reasoncode.module";

describe("ReasonCodeService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReasoncodeModule],
      providers: [CookieService],
    })
  );

  it("should be created", () => {
    const service: ReasonCodeService = TestBed.get(ReasonCodeService);
    expect(service).toBeTruthy();
  });
});
