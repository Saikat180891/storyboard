import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppcontrolService {
  private overlayStatus:boolean = false;
  currentState;
  private editCard = [];

  data = new EventEmitter<any>();

  constructor() { }

  /**
   * Open/close backdrop
   * @param status 
   */
  setOverlay(status){
    this.overlayStatus = status;
  }

  /**
   * Check if backdrop is open or not
   */
  getOverlay(){
    return this.overlayStatus;
  }

  // showOverlay(){
  //   return this.overlayStatus = true;
  // }

  // hideOverlay(){
  //   return this.overlayStatus = false;
  // }

  /**
   * Write dialog box header
   * @param value 
   */
  overlayHeaderAssigner(value){
    this.currentState = value;
  }

  getOverlayHeader(){
    return this.currentState;
  }

  setCardEdit(cardToEdit){
    this.editCard[0] = cardToEdit;
    //console.log("Due Date = " + this.editCard.dueDate)
    
    setTimeout(()=>{
      console.log(this.editCard)
    },2000)
    
  }

  getCardEditValues(){
    // console.log(this.editCard)
    return this.editCard;
  }

}
