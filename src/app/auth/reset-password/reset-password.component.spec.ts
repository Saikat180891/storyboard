import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { PasswordStrengthMeterModule } from "angular-password-strength-meter";
import { CookieService } from "ngx-cookie-service";
import { ResetPasswordComponent } from "./reset-password.component";

describe("ResetPasswordComponent", () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let debugElement: DebugElement;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        PasswordStrengthMeterModule,
      ],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    element = debugElement.nativeElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    document.body.removeChild(element);
  });
});
