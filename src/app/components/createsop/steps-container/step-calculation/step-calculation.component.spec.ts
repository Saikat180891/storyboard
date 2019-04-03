import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreatesopModule } from "../../createsop.module";
import { StepCalculationComponent } from "./step-calculation.component";

describe("StepCalculationComponent", () => {
  let component: StepCalculationComponent;
  let fixture: ComponentFixture<StepCalculationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreatesopModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepCalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
