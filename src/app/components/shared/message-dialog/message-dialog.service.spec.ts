import { TestBed } from "@angular/core/testing";

import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { MessageDialogService } from "./message-dialog.service";

describe("MessageDialogService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule],
    })
  );

  it("should be created", () => {
    const service: MessageDialogService = TestBed.get(MessageDialogService);
    expect(service).toBeTruthy();
  });
});
