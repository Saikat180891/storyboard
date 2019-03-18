import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StepTypeComponent } from "./step-type.component";

describe("StepTypeComponent", () => {
  let component: StepTypeComponent;
  let fixture: ComponentFixture<StepTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepTypeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
