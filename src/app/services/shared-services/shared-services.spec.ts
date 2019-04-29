import { TestBed } from "@angular/core/testing";

import { MatSnackBar } from "@angular/material";
import { SharedService } from "./shared.service";

describe("SharedService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: MatSnackBar, useValue: {} }],
    })
  );

  it("should be created", () => {
    const service: SharedService = TestBed.get(SharedService);
    expect(service).toBeTruthy();
  });
});
