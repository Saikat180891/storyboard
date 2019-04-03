import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { CookieService } from "ngx-cookie-service";
import { CreatesopModule } from "../createsop.module";
import { CreatesopComponent } from "./createsop.component";

describe("CreatesopComponent", () => {
  let component: CreatesopComponent;
  let fixture: ComponentFixture<CreatesopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CreatesopModule, RouterTestingModule, BrowserAnimationsModule],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
