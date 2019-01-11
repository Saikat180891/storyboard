import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private active:boolean = false;
  private messageTitle: string;
  private messageBody: string;
  private timeDelay: number;

  constructor() { }

  show(messageTitle: string, messageBody: string, timeDelay?: number){
    this.messageTitle = messageTitle;
    this.messageBody = messageBody;
    this.timeDelay = timeDelay;
    this.active = true;
    this.getStatus();
  }

  hide(){
    this.active = false;
  }

  getStatus(){
    return {
      status: true,
      active: this.active,
      messageTitle: this.messageTitle,
      messageBody: this.messageBody,
      timeDelay: this.timeDelay
    }
  }
}
