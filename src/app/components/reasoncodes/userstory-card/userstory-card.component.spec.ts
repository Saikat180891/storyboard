import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { CookieService } from "ngx-cookie-service";
import { ReasoncodeModule } from "../reasoncode.module";
import { ReasoncodesComponent } from "../reasoncodes.component";
import { UserstoryCardComponent } from "./userstory-card.component";

describe("UserstoryCardComponent", () => {
  let component: UserstoryCardComponent;
  let fixture: ComponentFixture<UserstoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReasoncodeModule, HttpClientTestingModule, RouterTestingModule],
      providers: [CookieService, ReasoncodesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
