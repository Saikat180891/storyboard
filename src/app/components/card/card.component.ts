import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';

import {AppcontrolService} from '../../controlservice/appcontrol.service';
import {DataService} from '../../data.service';
import {CardService} from './card.service';
import {ContainerService} from '../container/container.service';
import {PreloaderService} from '../shared/preloader/preloader.service';

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
  @Output('deleteSop')  deleteSop = new EventEmitter();
  rippleColor = 'rbga(0,0,0,0.2)';
  localData;
  createSOP = "Create New Project";
  editSOP = "Edit Project";
  currentStatus;
  myIndex;
  cardID;
  context = 1;
  id = '0';
  // @Output() cardContent = new EventEmitter();
  // imagePath = 'https://statewideguttercompany.com/wp-content/uploads/2012/07/logo-placeholder.jpg';

  constructor(
    private _UIcontrolerService:AppcontrolService, 
    private _dataService:DataService,
    private _cardService:CardService,
    private _containerService: ContainerService,
    private _preloader: PreloaderService
    ) { }

   ngOnInit(){
    this.localData = this.cardData;
    this._cardService.cardContent = this.cardData;
   }
   ngOnChanges(){
    this.localData = this.cardData;
   }

  onCreateSOP(){
    this._UIcontrolerService.setOverlay(true);
    this._UIcontrolerService.overlayHeaderAssigner(this.createSOP);
  }

  onPrevent(event){
    event.stopPropagation();
  }

  onEdit(event, cardData){
    // event.stopPropagation();
    // event.preventDefault();
    this._UIcontrolerService.setOverlay(true);
    this._UIcontrolerService.overlayHeaderAssigner(this.editSOP);
    this._UIcontrolerService.setCardEdit(cardData);
    this._UIcontrolerService.data.emit(cardData)
  }

  onDelete(localData){
    this.deleteSop.emit({id: localData.id, status: true});
  }
  
}
