import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthGuardService } from "../auth-guard.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(private authService: AuthGuardService) {}

  forgotPasswordForm = new FormGroup({
    email: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.email])
    ),
  });
  errorMessage: string = "";

  ngOnInit() {}

  forgotPassword() {
    const payLoad = { email: this.forgotPasswordForm.get("email").value };
    if (this.forgotPasswordForm.valid) {
      this.errorMessage = "";
      this.authService.forgotPasswordUser(payLoad).subscribe(
        res => {
          if (res) {
            this.errorMessage = "Email has been sent to the provided email id";
          }
        },
        err => {
          if (err.error.detail) {
            this.errorMessage = err.error.detail;
          } else {
            this.errorMessage = "Could not send email to user.";
          }
        }
      );
    } else {
      this.errorMessage = "Please Enter a valid Email ID";
    }
  }
}
