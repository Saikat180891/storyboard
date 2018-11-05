import { Component, OnInit, Input, HostListener, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';
import {TooltipPosition} from '@angular/material';
import {FormControl} from '@angular/forms';
import {ScreenHolderService} from '../screen-holder/screen-holder.service';

import {hideAccordian} from '../../../animation';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27,
  ENTER = 13
}


@Component({
  selector: 'app-custom-accordian',
  templateUrl: './custom-accordian.component.html',
  styleUrls: ['./custom-accordian.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [hideAccordian]
})
export class CustomAccordianComponent implements OnInit {
  @Input('screenDetails') screenDetails;

  @Output() addNewScreen = new EventEmitter();

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  
  screenSelected;

  expand:boolean = true;

  screens = [];

  constructor(private _screenHolderService: ScreenHolderService) { }

  ngOnInit() {
    this.screens = this._screenHolderService.carousal;
  }

  onExpand(event){
    // console.log(event)
    event.stopPropagation();
    this.expand = !this.expand;
  }

  onAddScreen(){
    this.addNewScreen.emit(true);
  }

  onSelect(screen, index){
    console.log(screen, index);
    this.screenSelected = index;
    let screenID = this._screenHolderService.carousal.indexOf(screen);
  }

  onStopPropagation(event){
    event.stopPropagation();
  }

}
