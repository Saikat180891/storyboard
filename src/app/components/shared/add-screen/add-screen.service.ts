import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddScreenService {

  tempObj = {
    numberOfSteps: [],
  };

  reset(){
    this.tempObj = {
      numberOfSteps: [],
    }
  }

  constructor() { }
}
