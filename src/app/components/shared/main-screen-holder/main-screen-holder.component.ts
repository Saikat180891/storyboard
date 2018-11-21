import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {ScreenHolderService} from '../screen-holder/screen-holder.service';

@Component({
  selector: 'app-main-screen-holder',
  templateUrl: './main-screen-holder.component.html',
  styleUrls: ['./main-screen-holder.component.scss']
})
export class MainScreenHolderComponent implements OnInit {

  // @Output() mainScreenPayload = new EventEmitter();
  @Output() screenTracker = new EventEmitter();

  constructor(private _screenHolderService: ScreenHolderService) { }

  ngOnInit() {

  }

  getPayload(event){
    // this.mainScreenPayload.emit(event)
    // console.log("This is the response ",event)
    
  }

  getCurrentScreen(event){
    // console.log("This is the Current Screen ",event)
    this.screenTracker.emit(event)
  }

}
