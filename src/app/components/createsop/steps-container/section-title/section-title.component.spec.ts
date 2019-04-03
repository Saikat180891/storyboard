import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieService } from "ngx-cookie-service";
import { CreatesopModule } from "../../createsop.module";
import { SectionTitleComponent } from "./section-title.component";

describe("SectionTitleComponent", () => {
  let component: SectionTitleComponent;
  let fixture: ComponentFixture<SectionTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreatesopModule, BrowserAnimationsModule],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
