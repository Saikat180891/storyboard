import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ExportToSopComponent } from "./export-to-sop.component";

describe("ExportToSopComponent", () => {
  let component: ExportToSopComponent;
  let fixture: ComponentFixture<ExportToSopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExportToSopComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportToSopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
