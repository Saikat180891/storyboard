import { HttpClientModule } from "@angular/common/http";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { CookieService } from "ngx-cookie-service";

import { GlobalmoduleModule } from "../../module/globalmodule/globalmodule.module";
import { ForgotPasswordComponent } from "../forgot-password/forgot-password.component";

import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, ForgotPasswordComponent],
      imports: [
        FormsModule,
        GlobalmoduleModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [CookieService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
