import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "../../data.service";
import { HeaderService } from "./header.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // a variable to store username
  userName: string = "";
  // a variable to store the link of the user's image
  userImage: any;

  constructor(
    // the HeaderService is required in the header.component.html
    // to trigger the state of mat-progress-bar
    public headerService: HeaderService,
    public __api: DataService
  ) {}

  ngOnInit() {
    /**
     * the userName of the currently logged in user is aquired
     * from a auth component and is stored in the local storage
     * in order to display the current user the userName is
     * fetched from the localstorage and is interpolated in the
     * html page
     */
    this.userName = localStorage.getItem("userName");
  }

  ngOnDestroy() {}

  onLogout() {
    /**
     * when the logout button is clicked
     * clear all cookies, session variables,
     * and loacal variables from the browser
     */
    this.headerService.onLogout();
  }
}
