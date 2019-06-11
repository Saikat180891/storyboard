import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { ConfirmModalWithOptionComponent } from "./confirm-modal-with-options.component";

describe("ConfirmModalWithOptionComponent", () => {
  let component: ConfirmModalWithOptionComponent;
  let fixture: ComponentFixture<ConfirmModalWithOptionComponent>;

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
    fixture = TestBed.createComponent(ConfirmModalWithOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
