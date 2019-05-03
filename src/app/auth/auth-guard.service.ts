/**
 * Service file for checking user Login, External user Login
 */

import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { DataService } from "../data.service";
import { SharedService } from "../services/shared-services/shared.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  userLoggedIn: boolean = false;
  externalLoggedIn: boolean;

  constructor(
    private router: Router,
    private dataService: DataService,
    private cookieService: CookieService,
    private sharedService: SharedService
  ) {}

  /**
   *
   * @param route : ActivatedRouteSnapshot
   * @param state : RouterStateSnapshot
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.getToken()) {
      return this.getToken();
    }
    this.router.navigate(["/"]);
    return this.getToken();
  }

  getToken() {
    return sessionStorage.getItem("status") ? true : false;
  }

  /**
   * Get Api call to Backend to check if user is logged in
   */
  isUserLoggedIn() {
    this.dataService.fetchData("/checkLogin").subscribe(res => {
      if (res["user_logged_in"] === true) {
        this.router.navigate(["/projects"]);
        sessionStorage.setItem("status", "loggedIn");
        if (res["name"]) {
          localStorage.setItem("userName", res["name"]);
        }
        return true;
      }
      this.router.navigate(["/"]);
      localStorage.clear();
      return false;
    });
    return false;
  }

  /**
   * Post Api call to backend for external User Login
   * @param loginDetails : Json containing email and password for external user login
   */
  externalUserLogin(loginDetails) {
    this.dataService.postLogin("/external_user_login/", loginDetails).subscribe(
      res => {
        if (res && res.detail === "Login successful") {
          this.isUserLoggedIn();
        } else {
          alert(res);
        }
      },
      err => {
        this.sharedService.raiseError(err);
      }
    );
  }

  /**
   * Api call to backend to reset password
   * @param forgotPasswordFields : Forgot Password Reset Field containing json containing email-d
   */
  forgotPasswordUser(forgotPasswordFields) {
    return this.dataService.postLogin("/reset_password/", forgotPasswordFields);
  }
}
