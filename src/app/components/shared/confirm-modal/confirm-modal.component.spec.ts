import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { ButtonComponent } from "../button/button.component";
import { ConfirmModalComponent } from "./confirm-modal.component";

describe("ConfirmModalComponent", () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
