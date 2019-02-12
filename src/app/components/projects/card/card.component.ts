import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';

import {AppcontrolService} from '../../../services/controlservice/appcontrol.service';
import {DataService} from '../../../data.service';
import {CardService} from './card.service';
import {ContainerService} from '../container/container.service';

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

  sopPermissions:any = []; 
  @Input() cardData;
  @Output('deleteSop')  deleteSop = new EventEmitter();
  @Output('grantedPermissions') grantedPermissions = new EventEmitter();
  @Output('openCreateProject') openCreateProject = new EventEmitter();
  @Output('openEditProject') openEditProject = new EventEmitter();

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
    ) { }

   ngOnInit(){
    this.localData = this.cardData;
    this._cardService.cardContent = this.cardData;
    this.sopPermissions = this._containerService.permissions;
   }
   ngOnChanges(){
    this.localData = this.cardData;
   }

  onCreateSOP(){
    this.openCreateProject.emit(true);
    // this._UIcontrolerService.setOverlay(true);
    // this._UIcontrolerService.overlayHeaderAssigner(this.createSOP);
  }

  onPrevent(event){
    event.stopPropagation();
  }

  onEdit(cardData:any){
    // event.stopPropagation();
    // event.preventDefault();
    this.openEditProject.emit({
      data:cardData, 
      role: cardData.assignee[0].role, 
      permissions:cardData.currentUserPermission,
      status:true
    });
    // this._cardService.sopId = cardData.id;
    // this._UIcontrolerService.setOverlay(true);
    // this._UIcontrolerService.overlayHeaderAssigner(this.editSOP);
    // this._UIcontrolerService.setCardEdit(cardData);
    // this._UIcontrolerService.data.emit(cardData);
  }

  onDelete(localData){
    this.deleteSop.emit({id: localData.id, status: true});
  }
  
}
