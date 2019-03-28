import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ProjectConfigBaseComponent } from "./project-config-base.component";

describe("ProjectConfigBaseComponent", () => {
  let component: ProjectConfigBaseComponent;
  let fixture: ComponentFixture<ProjectConfigBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectConfigBaseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectConfigBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
