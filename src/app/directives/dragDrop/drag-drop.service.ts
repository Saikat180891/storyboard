import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  private payload:any;

  constructor() { }

  getPayload(){
    return this.payload;
  }

  setPayload(value:any){
    this.payload = value;
  }
}
