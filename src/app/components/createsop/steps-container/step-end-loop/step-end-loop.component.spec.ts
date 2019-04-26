import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormsModule } from "@angular/forms";
import { GlobalmoduleModule } from "../../../../module/globalmodule/globalmodule.module";
import { StepEndLoopComponent } from "./step-end-loop.component";

describe("StepEndLoopComponent", () => {
  let component: StepEndLoopComponent;
  let fixture: ComponentFixture<StepEndLoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, GlobalmoduleModule],
      declarations: [StepEndLoopComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepEndLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
