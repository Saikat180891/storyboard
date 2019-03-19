/**
 * Author: Anmol Dhingra
 *
 * SignUp User Type Script for signing up
 */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { SignupService } from "./signup.service";

@Component({
  selector: "app-signupusers",
  templateUrl: "./signupusers.component.html",
  styleUrls: ["./signupusers.component.scss"],
})
export class SignupusersComponent implements OnInit {
  baseUrl = environment.production
    ? window.location.origin
    : "http://localhost:8000";
  constructor(
    private _api: SignupService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  password_mismatch = false;
  signup_form = 1;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  invitation_id: string;
  project_id: number;
  strong_password: boolean = false;
  passwordMessage = "";
  passwordStrengthStatus: string = "Weak";

  /**
   * Get Query parameters and if status is "success" or "failure" show respective page
   * otherwise Show Signup populating fields from Query params
   */
  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      if (res.status == "success") {
        this.signup_form = 2;
      } else if (res.status == "failure") {
        this.signup_form = 3;
      } else {
        this.project_id = parseInt(res.sop);
        this.invitation_id = res.invitation_id;
        this.email = res.email;
        this.firstName = res.first_name;
        this.lastName = res.last_name;
      }
    });
  }

  /**
   * Calls SignUp Service to check strength of password
   */
  checkStrength() {
    const password_status = this._api.strengthMessage(this.password);
    this.strong_password = password_status["strong_password"];
    this.passwordMessage = password_status["passwordMessage"];
  }

  /**
   * Function to navigate to Login Page
   */
  loginPage() {
    this.router.navigate(["/"]);
  }

  /**
   * Calls SignUp service to externalSignUp
   */
  externalSignup() {
    const signup_details = {
      email: this.email,
      password: this.password,
      invitation_id: this.invitation_id,
      sop: this.project_id,
    };

    if (this.strong_password) {
      if (this.password == this.confirmPassword) {
        this.password_mismatch = false;
        this._api.signUpUser(signup_details).subscribe(res => {
          if (res == "Success") {
            this.signup_form = 2;
          } else {
            this.signup_form = 3;
          }
        });
      } else {
        this.passwordMessage = "Password Mismatch";
      }
    } else {
      this.passwordMessage =
        "Password should contain atleast 1 Small Alphabet, 1 Capital Alphabet , 1 Number, 1 Special Character";
    }
  }

  /**
   * Changes label between "Weak", "Medium" and "Strong" based on passwordChange
   */
  onStrengthChange($event) {
    if ($event < 3) {
      this.passwordStrengthStatus = "Weak";
    } else if ($event == 3) {
      this.passwordStrengthStatus = "Medium";
    } else if ($event > 3) {
      this.passwordStrengthStatus = "Strong";
    }
  }
}
