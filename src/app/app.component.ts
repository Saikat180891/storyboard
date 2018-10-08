import { Component, Output, EventEmitter } from '@angular/core';
import {AppcontrolService} from './controlservice/appcontrol.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _constrolService:AppcontrolService){

  }
  title = 'project-test';
  // @Output() overlayH: EventEmitter<any> = new EventEmitter<any>();
  
  // fn(){
  //   this.overlayH.emit(1);
  //   console.log("hello")
  // }
}
