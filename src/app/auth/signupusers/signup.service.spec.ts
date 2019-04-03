import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CookieService } from "ngx-cookie-service";
import { SignupService } from "./signup.service";

describe("SignupService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [CookieService],
    })
  );

  it("should be created", () => {
    const service: SignupService = TestBed.get(SignupService);
    expect(service).toBeTruthy();
  });
});
