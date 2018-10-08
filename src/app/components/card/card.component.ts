import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';

import {AppcontrolService} from '../../controlservice/appcontrol.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
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
export class CardComponent implements OnInit, OnChanges{

  @Input() cardData;
  localData;
  @Output() overlay: EventEmitter<boolean> = new EventEmitter<boolean>();
  createSOP = "Create New SOP";
  editSOP = "Edit SOP";
  currentStatus;
  myIndex;
  

  constructor(private controlBackdrop:AppcontrolService) {
    //console.log(this.cardData)
   }

   ngOnInit(){
    console.log(this.myIndex)
   }
   ngOnChanges(){
    this.localData = this.cardData;
    //console.log(this.localData)
   }

  onCreateSOP(){
    //this.overlay.emit(true);
    this.controlBackdrop.setOverlay(true);
    this.currentStatus = this.createSOP;
  }

  onEdit(){
    this.controlBackdrop.setOverlay(true);
    this.currentStatus = this.editSOP;
  }

  // onOverlayClose(){
  //   this.overlay = false;
  // }

  // preventPropagation(event){
  //   event.stopPropagation();
  // }

  // onClose(){
  //   this.overlay = false;
  // }
  
}
