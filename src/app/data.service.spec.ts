import { inject, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { DataService } from "./data.service";

describe("DataService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, CookieService],
      imports: [HttpClientTestingModule],
    });
  });

  it("should be created", inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
