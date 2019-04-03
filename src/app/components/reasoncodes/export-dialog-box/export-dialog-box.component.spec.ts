import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CookieService } from "ngx-cookie-service";
import { ReasoncodeModule } from "../reasoncode.module";
import { ExportDialogBoxComponent } from "./export-dialog-box.component";

describe("ExportDialogBoxComponent", () => {
  let component: ExportDialogBoxComponent;
  let fixture: ComponentFixture<ExportDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReasoncodeModule, HttpClientTestingModule],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
