import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import {DataService} from '../data.service';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(
    private router: Router,
    private _msAdalSvc: MsAdalAngular6Service,
    private _api:DataService
  ) { }

  ngOnInit() {
    if (this._msAdalSvc.isAuthenticated) {
      this.goToDashboard(); // navigate to Home page
    }
  }

  initiateLogin(event = null) {
    if (event) {
      event.preventDefault();
    }

    this._msAdalSvc.login();
  }

  acquireAzureToken() {
    /**
     * The below functionality to be used for generating the resource level tokens for the API
     * our application will consume.
     */

    this._msAdalSvc.acquireToken('https://graph.microsoft.com').subscribe(
      (token) => {
        console.log("Token",token);
        this.goToDashboard(); // navigate to the dashboard
      },
      error => {
        console.log(error);
      });
  }

  goToDashboard() {
    this.router.navigate(['projects']);
  }
}
