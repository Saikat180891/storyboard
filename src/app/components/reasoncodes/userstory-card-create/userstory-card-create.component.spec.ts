import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { UserstoryCardCreateComponent } from "./userstory-card-create.component";

describe("UserstoryCardCreateComponent", () => {
  let component: UserstoryCardCreateComponent;
  let fixture: ComponentFixture<UserstoryCardCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserstoryCardCreateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryCardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
