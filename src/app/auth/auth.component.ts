import { Component } from "@angular/core";
import { AuthGuardService } from "./auth-guard.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent {
  constructor(private authService: AuthGuardService) {}

  loginSection: string = "login";

  ngOnInit() {
    this.authService.isUserLoggedIn();
  }

  initiateForgotPassword() {
    this.loginSection = "forgotPassword";
  }
}
