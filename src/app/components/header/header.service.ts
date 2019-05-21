import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class HeaderService {
  //this variable is used to control the display of the mat-progress-bar
  loading: boolean = false;
  constructor(private cookieService: CookieService) {}

  onLogout() {
    /**
     * when the logout button is clicked
     * clear all cookies, session variables,
     * and loacal variables from the browser
     */
    this.cookieService.deleteAll();
    sessionStorage.clear();
    localStorage.clear();
  }
}
