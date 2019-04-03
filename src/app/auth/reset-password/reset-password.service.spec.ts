import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { ResetPasswordService } from "./reset-password.service";

describe("ResetPasswordService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CookieService],
    })
  );

  it("should be created", () => {
    const service: ResetPasswordService = TestBed.get(ResetPasswordService);
    expect(service).toBeTruthy();
  });
});
