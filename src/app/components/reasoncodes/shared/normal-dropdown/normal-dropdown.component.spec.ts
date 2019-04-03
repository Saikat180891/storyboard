import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReasoncodeModule } from "../../reasoncode.module";
import { NormalDropdownComponent } from "./normal-dropdown.component";

describe("NormalDropdownComponent", () => {
  let component: NormalDropdownComponent;
  let fixture: ComponentFixture<NormalDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReasoncodeModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
