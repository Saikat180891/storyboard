/* 
Author: Anmol Dhingra

This Component is used for user login page

*/

import { Component } from "@angular/core";
import { environment } from "../../environments/environment";
import { AuthGaurdService } from "./auth-gaurd.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent {
  baseUrl = environment.production
    ? window.location.origin
    : "http://localhost:8000";

  constructor(private authService: AuthGaurdService) {}

  email: string;
  password: string;
  login_form_page: number = 1;
  errorMessage: string = "";

  /**
   * On Init it checks whether the user is already logged in
   */
  ngOnInit() {
    this.authService.isUserLoggedIn();
  }

  /**
   *  Calls a service module for external User Login
   */
  externalUserLogin() {
    const login_details = { email: this.email, password: this.password };
    console.log("Login Details", login_details);
    this.authService.externalUserLogin(login_details);
  }

  /**
   * Fuction to Logging to Azure
   */
  azureLogin() {
    window.location.href = this.baseUrl + "/login_ms";
  }

  /**
   *  Changes the page to forgot_password page
   * */
  initiateForgotPassword() {
    this.login_form_page = 2;
  }

  /**
   *  Function Calls a service to forgotPassword and navigate to the respective page on success or fail
   */
  forgotPassword() {
    const forgot_password_fields = { email: this.email };
    if (this.email) {
      this.errorMessage = "";
      this.authService
        .forgotPasswordUser(forgot_password_fields)
        .subscribe(res => {
          if (res == "Password Reset Email Sent") {
            this.login_form_page = 3;
          } else {
            this.login_form_page = 4;
          }
        });
    } else {
      this.errorMessage = "Enter the email ID";
    }
  }
}
