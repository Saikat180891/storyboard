import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { StepcontrolService } from "./stepcontrol.service";

describe("StepcontrolService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CookieService],
    })
  );

  it("should be created", () => {
    const service: StepcontrolService = TestBed.get(StepcontrolService);
    expect(service).toBeTruthy();
  });
});
