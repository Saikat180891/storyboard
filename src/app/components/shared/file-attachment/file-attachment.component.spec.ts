import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { GlobalmoduleModule } from "../../../module/globalmodule/globalmodule.module";
import { FileAttachmentComponent } from "./file-attachment.component";

describe("FileAttachmentComponent", () => {
  let component: FileAttachmentComponent;
  let fixture: ComponentFixture<FileAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
