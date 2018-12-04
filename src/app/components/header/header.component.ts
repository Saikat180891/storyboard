import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';
import {HeaderService} from './header.service';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

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
export class HeaderComponent implements OnInit {

  userName: string = '';
  userImage;

  constructor(
    private _msAdalSvc: MsAdalAngular6Service,
    private _userInfo: HeaderService
  ) { }

  ngOnInit() {
    // this._userInfo.getUserName();
    // this._msAdalSvc.LoggedInUserName()
    // family_name: "Paul"
    // given_name: "Saikat"
    this.userName = this._msAdalSvc.userInfo.profile.name;
    this.userImage = this._msAdalSvc.userInfo.profile.aio;
    console.log(this._msAdalSvc.userInfo)
    
  }

  logout() {
    this._msAdalSvc.logout();
  }

}
