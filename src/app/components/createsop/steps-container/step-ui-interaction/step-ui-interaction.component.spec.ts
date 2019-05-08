import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CookieService } from "ngx-cookie-service";
import { CreatesopModule } from "../../createsop.module";
import { StepUiInteractionComponent } from "./step-ui-interaction.component";

describe("StepUiInteractionComponent", () => {
  let component: StepUiInteractionComponent;
  let fixture: ComponentFixture<StepUiInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreatesopModule],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepUiInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
