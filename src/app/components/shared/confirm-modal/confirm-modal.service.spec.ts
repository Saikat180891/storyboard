import { TestBed } from "@angular/core/testing";

import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { ConfirmModalService } from "./confirm-modal.service";

describe("ConfirmModalService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule],
    })
  );

  it("should be created", () => {
    const service: ConfirmModalService = TestBed.get(ConfirmModalService);
    expect(service).toBeTruthy();
  });
});
