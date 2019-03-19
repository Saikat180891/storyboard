import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SprintConfigComponent } from "./sprint-config.component";

describe("SprintConfigComponent", () => {
  let component: SprintConfigComponent;
  let fixture: ComponentFixture<SprintConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SprintConfigComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
