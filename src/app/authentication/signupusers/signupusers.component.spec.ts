import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SignupusersComponent } from "./signupusers.component";

describe("SignupusersComponent", () => {
  let component: SignupusersComponent;
  let fixture: ComponentFixture<SignupusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupusersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
