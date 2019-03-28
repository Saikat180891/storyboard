import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SprintInputRowComponent } from "./sprint-input-row.component";

describe("SprintInputRowComponent", () => {
  let component: SprintInputRowComponent;
  let fixture: ComponentFixture<SprintInputRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SprintInputRowComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintInputRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
