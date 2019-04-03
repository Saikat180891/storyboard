import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieService } from "ngx-cookie-service";
import { ReasoncodeModule } from "../reasoncode.module";
import { ProjectConfigComponent } from "./project-config.component";

describe("ProjectConfigComponent", () => {
  let component: ProjectConfigComponent;
  let fixture: ComponentFixture<ProjectConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReasoncodeModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
