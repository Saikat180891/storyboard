import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AssigneeCardComponent } from "./assignee-card.component";

describe("AssigneeCardComponent", () => {
  let component: AssigneeCardComponent;
  let fixture: ComponentFixture<AssigneeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssigneeCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssigneeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
