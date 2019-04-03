import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreatesopModule } from "../createsop.module";
import { StepsContainerComponent } from "./steps-container.component";

describe("StepsContainerComponent", () => {
  let component: StepsContainerComponent;
  let fixture: ComponentFixture<StepsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreatesopModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
