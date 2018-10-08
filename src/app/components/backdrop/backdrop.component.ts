import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';

import {AppcontrolService} from '../../controlservice/appcontrol.service';


@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.css'],
  animations: [
    trigger('fadeIn',[
      state('void', style({opacity:0, top:'-100%'})),
      // state('*', style({opacity:1, right:'0'})),
      transition('void <=> *',[
        animate('200ms ease-in')
      ])
    ])
  ]
})
export class BackdropComponent implements OnInit, OnChanges {
  //@Input() overlay;
  @Input() currentStatus;

  constructor(private _appController:AppcontrolService) { 
    console.log("working")
  }

  ngOnInit() {
    //console.log(this.overlay)
  }

  ngOnChanges(){
    //console.log(this.overlay)
  }
/**
 * backdrop controls
 */

  onOverlayClose(){
    this._appController.setOverlay(false);
  }

  preventPropagation(event){
    event.stopPropagation();
  }

  onClose(){
    this._appController.setOverlay(false);
  }

/*
*
*/
  onOverlayChange(event){
    console.log(event);
  }

}
