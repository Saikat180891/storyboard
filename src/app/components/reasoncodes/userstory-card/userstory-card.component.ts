import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {EditUserStoryService} from '../userstory-card-edit/edit-user-story.service';
import {ReasonCodeService} from '../reason-code.service';
import {ReasoncodesComponent} from '../reasoncodes.component';
// import {EditUserStoryService} from '../userstory-card-edit/edit-user-story.service';
@Component({
  selector: 'app-userstory-card',
  templateUrl: './userstory-card.component.html',
  styleUrls: ['./userstory-card.component.scss']
})
export class UserstoryCardComponent implements OnInit, OnChanges {
  @Output('editUserStory') editUserStory = new EventEmitter();

  @Input('userStory') inputUserStory;

  @Input('restore') restore:boolean;

  @Input('disableDeleteBtn') disableDeleteBtn:boolean;

  @Output('deleteUserStory') deleteUserStory = new EventEmitter();

  @Input('disableEdit') disableEdit:boolean = false;

  userStory;

  rippleColor = 'rbga(0,0,0,0.2)';
  color = 'primary';
  permissions:any;
  role:string;

  constructor(private __editUS: EditUserStoryService, private __rcService: ReasonCodeService, private rcComponent: ReasoncodesComponent) {  }

  ngOnInit() {
    this.userStory = JSON.parse(JSON.stringify(this.inputUserStory));
  }

  ngOnChanges(){
    this.permissions = this.__rcService.grantedPermission;
    this.role = this.__rcService.role;
  }

  onEdit(){
    this.editUserStory.emit(true);
    this.__editUS.selected = this.inputUserStory.id;
    this.rcComponent.createOptionsWithSprintName();
  }

  checkIfPermissiongranted(requiredPermission:string){
    if(requiredPermission in this.permissions){
      return !this.permissions[requiredPermission];
    }else{
      return true;
    }
  }

  toggleRules(event, uid, uss_name){
    this.userStory.rules_approved = event.checked;
    let sprintId = 0;
    this.__rcService.sprintConfig.forEach(element=>{
      if(element.sprint_name === this.userStory.sprint_name){
        sprintId = element.id;
      }
    });
    this.userStory.ftes === "-----" ? delete this.userStory.ftes : '';
    let rc_id = 0;
    this.__rcService.reasonCodeData.forEach(element=>{
      if(element.name === this.userStory.rc_name){
        rc_id = element.id;
      }
    });
    this.userStory.planned_delivery = this.__editUS.formatDateToSendDataFromDisplayDate(this.userStory.planned_delivery);

    this.userStory.revised_delivery == '-----' ? this.userStory.revised_delivery = null : 
    this.userStory.revised_delivery =  this.__editUS.formatDateToSendDataFromDisplayDate(this.userStory.revised_delivery);

    this.__editUS.editUserStory(uid, sprintId, rc_id, this.userStory);
  }

  toggleTVC(event, uid, uss_name){
    this.userStory.verified_test_cases = event.checked;
    let sprintId = 0;
    this.__rcService.sprintConfig.forEach(element=>{
      if(element.sprint_name === this.userStory.sprint_name){
        sprintId = element.id;
      }
    });
    this.userStory.ftes === "-----" ? delete this.userStory.ftes : '';
    let rc_id = 0;
    this.__rcService.reasonCodeData.forEach(element=>{
      if(element.name === this.userStory.rc_name){
        rc_id = element.id;
      }
    });
    this.userStory.planned_delivery = this.__editUS.formatDateToSendDataFromDisplayDate(this.userStory.planned_delivery);

    this.userStory.revised_delivery == '-----' ? this.userStory.revised_delivery = null : 
    this.userStory.revised_delivery =  this.__editUS.formatDateToSendDataFromDisplayDate(this.userStory.revised_delivery);

    this.__editUS.editUserStory(uid, sprintId, rc_id, this.userStory);
  }

  onDelete(id){
    this.deleteUserStory.emit({id:id, status:true});
  }

  restoreUserStories(id){
    this.__rcService.restoreUserStories(id);
  }

  
}
