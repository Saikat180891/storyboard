import { TestBed } from "@angular/core/testing";

import { CookieService } from "ngx-cookie-service";
import { HeaderService } from "./header.service";

describe("HeaderService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [CookieService],
    })
  );

  it("should be created", () => {
    const service: HeaderService = TestBed.get(HeaderService);
    expect(service).toBeTruthy();
  });
});
