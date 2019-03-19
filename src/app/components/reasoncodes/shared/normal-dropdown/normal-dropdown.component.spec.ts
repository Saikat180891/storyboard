import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NormalDropdownComponent } from "./normal-dropdown.component";

describe("NormalDropdownComponent", () => {
  let component: NormalDropdownComponent;
  let fixture: ComponentFixture<NormalDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NormalDropdownComponent],
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
