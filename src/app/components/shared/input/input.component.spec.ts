import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { InputComponent } from "./input.component";

describe("InputTextBoxComponent", () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
