/**
 * Author: Anmol Dhingra
 * Date : 08/02/2019
 * SignUp Service file for external user sign up
 */
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../data.service";
@Injectable({
  providedIn: "root",
})
export class SignupService {
  constructor(private _api: DataService, private router: Router) {}

  /**
   * Post Request to backend for signing up.
   * @param signup_fields : Json file containing signUpDetails
   */
  signUpUser(signup_fields) {
    return this._api.postLogin("/invited_signup/", signup_fields);
  }

  /**
   * Checks the passwordStrength
   * @param password
   */
  strengthMessage(password) {
    let numberOfElements = 0;
    numberOfElements = /.*[a-z].*/.test(password)
      ? ++numberOfElements
      : numberOfElements; // Lowercase letters
    numberOfElements = /.*[A-Z].*/.test(password)
      ? ++numberOfElements
      : numberOfElements; // Uppercase letters
    numberOfElements = /.*[0-9].*/.test(password)
      ? ++numberOfElements
      : numberOfElements; // Numbers
    numberOfElements = /[^a-zA-Z0-9]/.test(password)
      ? ++numberOfElements
      : numberOfElements; // Special characters (inc. space)
    const password_status = {};
    if (password.length < 8) {
      password_status["strong_password"] = false;
      password_status["passwordMessage"] = "Min 8 characters required";
    } else if (numberOfElements < 4) {
      password_status["passwordMessage"] =
        "Password should contain atleast 1 Small Alphabet, 1 Capital Alphabet , 1 Number, 1 Special Character";
      password_status["strong_password"] = false;
    } else {
      password_status["passwordMessage"] = "";
      password_status["strong_password"] = true;
    }
    return password_status;
  }
}
