import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import {DataService} from '../data.service';
import {environment} from '../../environments/environment';
import { HttpHeaders} from '@angular/common/http';
import {AuthGaurdService} from './auth-gaurd.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  baseUrl = environment.production ? window.location.origin :'http://localhost:8000';

  constructor(
    private authService: AuthGaurdService
  ) { }

  email: string;
  password: string;
  login_form_page: number = 1;
  errorMessage: string = "";
  ngOnInit() {
    this.authService.isUserLoggedIn();
  }
  
  externalUserLogin()
  {
    let login_details = {'email': this.email, 'password': this.password};
    console.log("Login Details", login_details);
    this.authService.externalUserLogin(login_details);
  }
  azureLogin(){
    window.location.href= this.baseUrl+'/login_ms';
  }

  initiateForgotPassword()
  {
    this.login_form_page = 2;
  }
  
forgotPassword(){
  let forgot_password_fields = {'email': this.email}
  if (this.email){
    this.errorMessage="";
    this.authService.forgotPasswordUser(forgot_password_fields).subscribe(res=>{
      if(res == "Password Reset Email Sent"){
        this.login_form_page = 3;
      }
      else{
        this.login_form_page = 4;
      }
    })
  }
  else{
    this.errorMessage = "Enter the email ID";
  }
}
}
