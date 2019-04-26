import { TestBed } from "@angular/core/testing";
import { GlobalmoduleModule } from "../../../module/globalmodule/globalmodule.module";
import { FileAttachmentService } from "./file-attachment.service";

describe("FileAttachmentService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule],
    })
  );

  it("should be created", () => {
    const service: FileAttachmentService = TestBed.get(FileAttachmentService);
    expect(service).toBeTruthy();
  });
});
