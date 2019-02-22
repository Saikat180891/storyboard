/**
 * Author: Anmol Dhingra
 * 
 * Reset Password Service
 */
import { Injectable } from '@angular/core';
import {DataService} from '../../data.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  constructor(private _api:DataService) { }

  /**
   * Api Call to Backend to Reset Password
   * @param reset_password_fields : Reset password Details {email, password, password_reset_token}
   */
  resetPasswordUser(reset_password_fields){
    return this._api.postLogin('/confirm_password_reset/', reset_password_fields)
  }
  
}
