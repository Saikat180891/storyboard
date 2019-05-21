/**
 * Author: Anmol Dhingra
 *
 * Reset Password Component Type Script file
 */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HeaderService } from "src/app/components/header/header.service";
import { DataService } from "../../data.service";
import { SharedService } from "../../services/shared-services/shared.service";
import { SignupService } from "../signupusers/signup.service";
import { ResetPasswordService } from "./reset-password.service";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
  providers: [HeaderService],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private _api: ResetPasswordService,
    private signUpService: SignupService,
    private sharedService: SharedService,
    private dataService: DataService,
    private headerService: HeaderService
  ) {}

  email: string;
  password: string = "";
  confirmPassword: string;
  passwordResetToken: string;

  strong_password: boolean = false;
  passwordMessage: string = "";
  pageContent: number = 1;

  reset_password_form: number = 1;

  /**
   * Get Query Parameters as email-id and passwordResetToken
   */
  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      this.dataService.fetchData("/checkLogin").subscribe((res: any) => {
        if (res.user_logged_in === true) {
          this.reset_password_form = 4;
        }
      });

      this.email = res.email;
      this.passwordResetToken = res.reset_password_token;
    });
  }
  /**
   * Calls a service to check if the password is strong password or not
   */
  checkStrength() {
    const password_status = this.signUpService.strengthMessage(this.password);
    this.strong_password = password_status["strong_password"];
    this.passwordMessage = password_status["passwordMessage"];
  }

  /**
   * Changes label to Weak, Medium and Strong on password change.
   */
  passwordStrengthStatus: string = "Weak";
  onStrengthChange($event) {
    if ($event < 3) {
      this.passwordStrengthStatus = "Weak";
    } else if ($event == 3) {
      this.passwordStrengthStatus = "Medium";
    } else if ($event > 3) {
      this.passwordStrengthStatus = "Strong";
    }
  }

  /**
   * Calls a resetPassword Service to reset password and navigate to the respective page on success or failure
   */
  resetPassword() {
    const reset_password_fields = {
      email: this.email,
      password: this.password,
      reset_password_token: this.passwordResetToken,
    };
    if (this.strong_password) {
      if (this.password == this.confirmPassword) {
        this._api.resetPasswordUser(reset_password_fields).subscribe(
          res => {
            this.reset_password_form = 2;
          },
          err => {
            this.sharedService.raiseError(err);
            this.reset_password_form = 3;
          }
        );
      } else {
        this.passwordMessage = "Password Mismatch";
      }
    } else {
      this.passwordMessage =
        "Password should contain atleast 1 Small Alphabet, 1 Capital Alphabet , 1 Number, 1 Special Character";
    }
  }
}
