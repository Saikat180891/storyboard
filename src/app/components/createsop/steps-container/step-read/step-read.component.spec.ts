import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreatesopModule } from "../../createsop.module";
import { StepReadComponent } from "./step-read.component";

describe("StepReadComponent", () => {
  let component: StepReadComponent;
  let fixture: ComponentFixture<StepReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreatesopModule],
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
