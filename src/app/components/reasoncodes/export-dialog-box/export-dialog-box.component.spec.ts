import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ExportDialogBoxComponent } from "./export-dialog-box.component";

describe("ExportDialogBoxComponent", () => {
  let component: ExportDialogBoxComponent;
  let fixture: ComponentFixture<ExportDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExportDialogBoxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
