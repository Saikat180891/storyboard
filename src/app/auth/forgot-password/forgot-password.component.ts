import { Component, OnInit } from "@angular/core";
import { AuthGuardService } from "../auth-guard.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private authService: AuthGuardService) {}

  email: string;
  password: string;
  errorMessage: string = "";
  emailNotRegistered: boolean = false;
  forgotPasswordEmailSent: boolean = false;

  ngOnInit() {}

  forgotPassword() {
    const payLoad = { email: this.email };
    if (this.email) {
      this.errorMessage = "";
      this.authService.forgotPasswordUser(payLoad).subscribe(res => {
        if (res === "Password Reset, Email has been Sent") {
          this.forgotPasswordEmailSent = true;
        } else {
          this.emailNotRegistered = true;
        }
      });
    } else {
      this.errorMessage = "Please Enter the email ID";
      this.forgotPasswordEmailSent = false;
      this.emailNotRegistered = false;
    }
  }
}
