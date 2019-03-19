import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { StepReadComponent } from "./step-read.component";

describe("StepReadComponent", () => {
  let component: StepReadComponent;
  let fixture: ComponentFixture<StepReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepReadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
