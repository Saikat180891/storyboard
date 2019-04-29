import { TestBed } from "@angular/core/testing";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { ExportToWordModalComponent } from "./export-to-word-modal.component";
import { ExportToWordModalService } from "./export-to-word-modal.service";

describe("ExportToWordModalService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule, BrowserAnimationsModule],
    })
  );

  it("should be created", () => {
    const service: ExportToWordModalService = TestBed.get(
      ExportToWordModalService
    );
    expect(service).toBeTruthy();
  });
});
