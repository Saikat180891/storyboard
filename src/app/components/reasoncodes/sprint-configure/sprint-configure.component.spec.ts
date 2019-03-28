import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SprintConfigureComponent } from "./sprint-configure.component";

describe("SprintConfigureComponent", () => {
  let component: SprintConfigureComponent;
  let fixture: ComponentFixture<SprintConfigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SprintConfigureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
