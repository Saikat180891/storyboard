import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { ReasoncodeModule } from "../reasoncode.module";
import { CreateUserstoryService } from "./create-userstory.service";

describe("CreateUserstoryService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ReasoncodeModule, HttpClientTestingModule],
      providers: [CookieService],
    })
  );

  it("should be created", () => {
    const service: CreateUserstoryService = TestBed.get(CreateUserstoryService);
    expect(service).toBeTruthy();
  });
});
