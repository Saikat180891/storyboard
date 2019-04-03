import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { SopApiService } from "./sop-api.service";

describe("SopApiService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CookieService],
    })
  );

  it("should be created", () => {
    const service: SopApiService = TestBed.get(SopApiService);
    expect(service).toBeTruthy();
  });
});
