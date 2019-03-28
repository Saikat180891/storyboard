import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ImportStoriesComponent } from "./import-stories.component";

describe("ImportStoriesComponent", () => {
  let component: ImportStoriesComponent;
  let fixture: ComponentFixture<ImportStoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImportStoriesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
