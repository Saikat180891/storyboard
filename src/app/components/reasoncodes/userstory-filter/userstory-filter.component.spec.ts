import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { ReasoncodeModule } from "../reasoncode.module";
import { UserstoryFilterComponent } from "./userstory-filter.component";

describe("UserstoryFilterComponent", () => {
  let component: UserstoryFilterComponent;
  let fixture: ComponentFixture<UserstoryFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReasoncodeModule, HttpClientTestingModule],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserstoryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
