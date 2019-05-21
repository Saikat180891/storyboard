import { Component, OnInit } from "@angular/core";
import { SharedService } from "../../services/shared-services/shared.service";
import { AuthGuardService } from "../auth-guard.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private authService: AuthGuardService,
    private sharedService: SharedService
  ) {}

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
      this.authService.forgotPasswordUser(payLoad).subscribe(
        res => {
          if (res) {
            this.forgotPasswordEmailSent = true;
          }
        },
        err => {
          this.sharedService.raiseError(err);
          this.emailNotRegistered = true;
        }
      );
    } else {
      this.errorMessage = "Please Enter the email ID";
      this.forgotPasswordEmailSent = false;
      this.emailNotRegistered = false;
    }
  }
}
