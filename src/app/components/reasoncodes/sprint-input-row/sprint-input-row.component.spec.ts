import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReasoncodeModule } from "../reasoncode.module";
import { SprintInputRowComponent } from "./sprint-input-row.component";

describe("SprintInputRowComponent", () => {
  let component: SprintInputRowComponent;
  let fixture: ComponentFixture<SprintInputRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReasoncodeModule],
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
