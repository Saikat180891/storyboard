import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule } from "@angular/forms";
import { GlobalmoduleModule } from "../../../../module/globalmodule/globalmodule.module";
import { StepLoopComponent } from "./step-loop.component";

describe("StepLoopComponent", () => {
  let component: StepLoopComponent;
  let fixture: ComponentFixture<StepLoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, GlobalmoduleModule],
      declarations: [StepLoopComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
