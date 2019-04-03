import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CookieService } from "ngx-cookie-service";
import { CreatesopModule } from "../createsop.module";
import { RightPanelComponent } from "./right-panel.component";

describe("RightPanelComponent", () => {
  let component: RightPanelComponent;
  let fixture: ComponentFixture<RightPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreatesopModule],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
