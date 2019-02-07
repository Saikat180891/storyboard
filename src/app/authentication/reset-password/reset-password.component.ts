import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { ResetPasswordService } from './reset-password.service';
import { SignupService } from '../signupusers/signup.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route:ActivatedRoute, private _api:ResetPasswordService, private signUpService: SignupService) { }
  email: string;
  password: string ="";
  confirmPassword: string;
  passwordResetToken: string;

  strong_password: boolean=false;
  passwordMessage: string = ""
  pageContent: number=1;

  reset_password_form: number = 1;
  ngOnInit() {
    console.log(this.password)
    this.route.queryParams.subscribe(res=>{
      // if (res.status == "success")
      // {
      //   // this.signup_form = 2;
      // }
      // else if(res.status == "failure")
      // {
      //   // this.signup_form = 3;
      // }
      // else{
      this.email = res.email;
      this.passwordResetToken = res.reset_password_token;
      // }
 
    })
  }
  checkStrength(){
    
    let password_status = this.signUpService.strengthMessage(this.password);
    this.strong_password = password_status["strong_password"];
    this.passwordMessage = password_status["passwordMessage"];
  }

resetPassword(){

  let reset_password_fields = {'email': this.email, 'password': this.password, 'reset_password_token':this.passwordResetToken};
  if(this.strong_password && this.password == this.confirmPassword)
  {
  this._api.resetPasswordUser(reset_password_fields).subscribe(res=>{
    if(res == "Success"){
      this.reset_password_form = 2;
    }
    else{
      this.reset_password_form = 3;
    }
  })

}
}
}
