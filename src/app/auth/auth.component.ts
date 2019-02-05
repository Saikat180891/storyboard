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

  ngOnInit() {
    this.authService.isUserLoggedIn();
  }
}
