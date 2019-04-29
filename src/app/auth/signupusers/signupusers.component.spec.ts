import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { RouterTestingModule } from "@angular/router/testing";
import { PasswordStrengthMeterModule } from "angular-password-strength-meter";
import { CookieService } from "ngx-cookie-service";
import { SignupusersComponent } from "./signupusers.component";

describe("SignupusersComponent", () => {
  let component: SignupusersComponent;
  let fixture: ComponentFixture<SignupusersComponent>;
  let debugElement: DebugElement;
  let element: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupusersComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        PasswordStrengthMeterModule,
      ],
      providers: [CookieService, { provide: MatSnackBar, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupusersComponent);
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
