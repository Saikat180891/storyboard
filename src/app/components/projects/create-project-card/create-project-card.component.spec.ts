import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CreateProjectCardComponent } from "./create-project-card.component";

describe("CreateProjectCardComponent", () => {
  let component: CreateProjectCardComponent;
  let fixture: ComponentFixture<CreateProjectCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateProjectCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
