import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CookieService } from "ngx-cookie-service";
import { CreatesopModule } from "../createsop.module";
import { LeftPanelComponent } from "./left-panel.component";

describe("LeftPanelComponent", () => {
  let component: LeftPanelComponent;
  let fixture: ComponentFixture<LeftPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreatesopModule],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
