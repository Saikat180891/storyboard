import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppcontrolService {
  private overlayStatus:boolean = false;

  constructor() { }

  setOverlay(status){
    this.overlayStatus = status;
  }

  getOverlay(){
    return this.overlayStatus;
  }

  showOverlay(){
    return this.overlayStatus = true;
  }

  hideOverlay(){
    return this.overlayStatus = false;
  }

}
