import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';

import {AppcontrolService} from '../../controlservice/appcontrol.service';
import {DataService} from '../../data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
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
  createSOP = "Create New SOP";
  editSOP = "Edit SOP";
  currentStatus;
  myIndex;
  cardID;
  // imagePath = 'https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg';

  constructor(private _UIcontrolerService:AppcontrolService, private _dataService:DataService) {
   }

   ngOnInit(){
    console.log(this.myIndex)
   }
   ngOnChanges(){
    this.localData = this.cardData;
   }

  onCreateSOP(){
    this._UIcontrolerService.setOverlay(true);
    this._UIcontrolerService.overlayHeaderAssigner(this.createSOP);
  }

  onEdit(cardData){
    this._UIcontrolerService.setOverlay(true);
    this._UIcontrolerService.overlayHeaderAssigner(this.editSOP);
    this._UIcontrolerService.setCardEdit(cardData);
    this._UIcontrolerService.data.emit(cardData)
  }
  
}
