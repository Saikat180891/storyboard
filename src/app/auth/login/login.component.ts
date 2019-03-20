import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataService } from "../../data.service";
import { AuthGuardService } from "../auth-guard.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthGuardService,
    private dataService: DataService
  ) {}

  @Output() initiateForgotPasswordEvent = new EventEmitter<string>();

  email: string;
  password: string;

  ngOnInit() {}

  externalUserLogin() {
    const loginDetails = { email: this.email, password: this.password };
    this.authService.externalUserLogin(loginDetails);
  }

  azureLogin() {
    window.location.href = `${this.dataService.getBaseURL()}/login_ms`;
  }

  initiateForgotPassword() {
    this.initiateForgotPasswordEvent.next();
  }
}
