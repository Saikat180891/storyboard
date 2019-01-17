import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import {HeaderService} from './header.service';
import {DataService} from '../../data.service';
import { CookieService } from 'ngx-cookie-service';

// import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
])
  ]
})
export class HeaderComponent implements OnInit, OnDestroy {

  userName: string = '';
  userImage;

  constructor(
    // private _msAdalSvc: MsAdalAngular6Service,
    private _userInfo: HeaderService,
    private __api: DataService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    // this._userInfo.getUserName();
    // this._msAdalSvc.LoggedInUserName()
    // family_name: "Paul"
    // given_name: "Saikat"
    // this.userName = this._msAdalSvc.userInfo.profile.name;
    // this.userImage = this._msAdalSvc.userInfo.profile.aio;
    // localStorage.setItem("uniqueName", this._msAdalSvc.userInfo.profile.unique_name);
    // console.log(this._msAdalSvc)
    console.log(this.cookieService.getAll())
    
  }

  ngOnDestroy(){
    this.cookieService.deleteAll();
  }

  onLogout() {
    // this.__api.fetchData('/logoutUser').subscribe(res=>{localStorage.clear()});
    // this.__api.apiUrl + 
    this.cookieService.deleteAll();
  }

}
