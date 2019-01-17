import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { Router } from '@angular/router';
import {DataService} from '../data.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  userLoggedIn:boolean = false;
    
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
    return localStorage.getItem("csrftoken") ? true : false;
  }

  isUserLoggedIn(){
    this._api.fetchData('/checkLogin').subscribe(res=>{
      if(res["user_logged_in"] === true){
        this.router.navigate(['/projects']);
        const value = this.cookieService.getAll();
        localStorage.setItem("csrftoken", value["csrftoken"]);
        return true;
      }else{
        this.router.navigate(['/']);
        localStorage.clear();
        return false;
      }
    });
    return false;
  }
}
