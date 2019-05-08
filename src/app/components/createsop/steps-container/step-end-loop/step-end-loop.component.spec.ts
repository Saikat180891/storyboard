import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormsModule } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { GlobalmoduleModule } from "../../../../module/globalmodule/globalmodule.module";
import { StepEndLoopComponent } from "./step-end-loop.component";

describe("StepEndLoopComponent", () => {
  let component: StepEndLoopComponent;
  let fixture: ComponentFixture<StepEndLoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, GlobalmoduleModule, HttpClientTestingModule],
      declarations: [StepEndLoopComponent],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepEndLoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
