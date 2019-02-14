import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {CardService} from './card.service';
import {ContainerService} from '../container/container.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges{

  sopPermissions:any = []; 
  @Input() cardData:any;
  @Output('deleteSop')  deleteSop = new EventEmitter();
  @Output('grantedPermissions') grantedPermissions = new EventEmitter();
  @Output('openCreateProject') openCreateProject = new EventEmitter();
  @Output('openEditProject') openEditProject = new EventEmitter();

  //this is the color required by the material directive to give the ripple effect
  rippleColor = 'rbga(0,0,0,0.2)';
  localData:any;
  id = '0';

  constructor(
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
  }

  onPrevent(event:any){
    event.stopPropagation();
  }

  onEdit(cardData:any){
    this.openEditProject.emit({
      data:cardData, 
      role: cardData.assignee[0].role, 
      permissions:cardData.currentUserPermission,
      status:true
    });
  }

  onDelete(localData){
    this.deleteSop.emit({id: localData.id, status: true});
  }
  
}
