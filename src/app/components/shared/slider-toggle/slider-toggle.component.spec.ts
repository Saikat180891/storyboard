import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { SliderToggleComponent } from "./slider-toggle.component";

describe("SliderToggleComponent", () => {
  let component: SliderToggleComponent;
  let fixture: ComponentFixture<SliderToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
