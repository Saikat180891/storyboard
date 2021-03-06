import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { GlobalmoduleModule } from "src/app/module/globalmodule/globalmodule.module";
import { DateInputComponent } from "./date-input.component";

describe("DateInputComponent", () => {
  let component: DateInputComponent;
  let fixture: ComponentFixture<DateInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GlobalmoduleModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
