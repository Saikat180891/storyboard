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
    /**
     * the initial values received from the Input is 
     * initiated to the local variables also the 
     * permission received for the projects page is and
     * is stored in the 'sopPermissions' variable
     */
    this.localData = this.cardData;
    this._cardService.cardContent = this.cardData;
    this.sopPermissions = this._containerService.permissions;
  }

  ngOnChanges(){
    this.localData = this.cardData;
  }

  onCreateSOP(){
    /**
     * this function open the create project dialog box when
     * the user clicks on the create project card
     */
    this.openCreateProject.emit(true);
  }

  onPrevent(event:any){
    event.stopPropagation();
  }

  onEdit(cardData:any){
    /**
     * this function is used to open the edit dialog box with the data 
     * of the projects and the permission required for authorization
     */
    this.openEditProject.emit({
      data:cardData, 
      role: cardData.assignee[0].role, 
      permissions:cardData.currentUserPermission,
      status:true
    });
  }

  onDelete(localData){
    /**
     * this function is used to open the confirm deletion of projects
     */
    this.deleteSop.emit({id: localData.id, status: true});
  }
  
}
