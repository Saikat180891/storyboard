import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreatesopModule } from "../../createsop.module";
import { StepTypeComponent } from "./step-type.component";

describe("StepTypeComponent", () => {
  let component: StepTypeComponent;
  let fixture: ComponentFixture<StepTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreatesopModule],
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
