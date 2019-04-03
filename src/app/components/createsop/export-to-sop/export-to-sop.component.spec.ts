import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { ExportToSopComponent } from "./export-to-sop.component";

describe("ExportToSopComponent", () => {
  let component: ExportToSopComponent;
  let fixture: ComponentFixture<ExportToSopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExportToSopComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportToSopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
