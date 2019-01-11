import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import {SnackbarService} from './snackbar.service';

@Component({
  selector: 'snackbar',
  templateUrl: './custom-snackbar.component.html',
  styleUrls: ['./custom-snackbar.component.scss']
})
export class CustomSnackbarComponent implements OnInit, OnDestroy {
  showSnackbarOverlay:boolean = true;
  active:boolean;
  messageTitle:string;
  messageBody:string;
  timeDelay:number;

  onSnackBarInitialize = {}

  constructor(private snackbar:SnackbarService) { }

  ngOnInit() {
    this.showSnackbarOverlay = this.snackbar.getStatus().status;
    this.messageTitle = this.snackbar.getStatus().messageTitle;
    this.messageBody = this.snackbar.getStatus().messageBody;
    this.active = this.snackbar.getStatus().active;
    this.timeDelay = this.snackbar.getStatus().timeDelay ? this.snackbar.getStatus().timeDelay : 2000;

    setTimeout(()=>{
      this.snackbar.hide();
    }, this.timeDelay);
    setTimeout(()=>{
      this.showSnackbarOverlay = true;
    }, this.timeDelay + 500);
  }

  ngOnDestroy(){

  }

  /**
   * to test snackbar
   */
  onClick(){
    // this.snackbar.active = !this.snackbar.active;
    // console.log(this.snackbar.active)
    // setTimeout(()=>{
    //   this.snackbar.active = false;
    //   this.closeOverlay = false;
    // }, this.timeDelay);
  }

  

  onClose(){
  }

}
