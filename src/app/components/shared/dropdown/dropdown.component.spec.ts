import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { DropdownComponent } from "./dropdown.component";

describe("DropdownComponent", () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
