import { TestBed } from "@angular/core/testing";

import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { ConfirmModalWithOptionService } from "./confirm-modal.service";

describe("ConfirmModalWithOptionService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule],
    })
  );

  it("should be created", () => {
    const service: ConfirmModalWithOptionService = TestBed.get(
      ConfirmModalWithOptionService
    );
    expect(service).toBeTruthy();
  });
});
