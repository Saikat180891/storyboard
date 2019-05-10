import { TestBed } from "@angular/core/testing";

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { UserstoryCreateEditModalService } from "./userstory-create-edit-modal.service";

describe("UserstoryCreateEditModalService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
  );

  it("should be created", () => {
    const service: UserstoryCreateEditModalService = TestBed.get(
      UserstoryCreateEditModalService
    );
    expect(service).toBeTruthy();
  });
});
