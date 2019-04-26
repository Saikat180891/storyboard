import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GlobalmoduleModule } from "../../../../module/globalmodule/globalmodule.module";
import { StepBaseComponent } from "./step-base.component";

describe("StepBaseComponent", () => {
  let component: StepBaseComponent;
  let fixture: ComponentFixture<StepBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepBaseComponent],
      imports: [GlobalmoduleModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
