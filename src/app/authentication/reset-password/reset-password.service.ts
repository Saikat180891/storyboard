import { Injectable } from '@angular/core';
import {DataService} from '../../data.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  constructor(private _api:DataService) { }

  resetPasswordUser(reset_password_fields){
    return this._api.postLogin('/confirm_password_reset/', reset_password_fields)
  }
  
}
