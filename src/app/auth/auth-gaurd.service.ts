import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  userLoggedIn:boolean = false;
  externalLoggedIn:boolean;
    
  constructor(
    private router: Router, 
    private _api:DataService, 
    private cookieService: CookieService
    ) { }

  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable< boolean> | Promise< boolean> | boolean{
    if(this.getToken()){
      return this.getToken();
    }else{
      this.router.navigate(["/"]);
      return this.getToken();
    }
  }

  getToken(){
    return sessionStorage.getItem("status") ? true : false;
  }

  isUserLoggedIn(){
    this._api.fetchData('/checkLogin').subscribe(res=>{
      if(res["user_logged_in"] === true){
        this.router.navigate(['/projects']);
        sessionStorage.setItem('status', 'loggedIn');
        if(res["name"]){
          localStorage.setItem("userName", res["name"]);
        }
        return true;
      }else{
        this.router.navigate(['/']);
        localStorage.clear();
        return false;
      }
    });
    return false;
  }

  externalUserLogin(login_details){
    this._api.postLogin('/external_user_login/', login_details).subscribe(res=>{
      if (res == "Login successful")
      {
        this.isUserLoggedIn();
      }
      else{
        alert(res);
      }
    });
  }
  forgotPasswordUser(forgot_password_fields){
    return this._api.postLogin('/reset_password/', forgot_password_fields)
  }
}
