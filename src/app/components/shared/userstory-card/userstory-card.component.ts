import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {EditUserStoryService} from '../userstory-card-edit/edit-user-story.service';
import {ReasonCodeService} from '../../reasoncodes/reason-code.service';
import {ReasoncodesComponent} from '../../reasoncodes/reasoncodes.component';
// import {EditUserStoryService} from '../userstory-card-edit/edit-user-story.service';
@Component({
  selector: 'app-userstory-card',
  templateUrl: './userstory-card.component.html',
  styleUrls: ['./userstory-card.component.scss']
})
export class UserstoryCardComponent implements OnInit {
  @Output('editUserStory') editUserStory = new EventEmitter();

  @Input('userStory') inputUserStory;

  @Input('restore') restore:boolean;

  userStory;

  rippleColor = 'rbga(0,0,0,0.2)';
  color = 'primary';

  constructor(private __editUS: EditUserStoryService, private __rcService: ReasonCodeService, private rcComponent: ReasoncodesComponent) {  }

  ngOnInit() {
    this.userStory = JSON.parse(JSON.stringify(this.inputUserStory));
  }

  onEdit(){
    this.editUserStory.emit(true);
    this.__editUS.selected = this.inputUserStory.id;
    this.rcComponent.createOptionsWithSprintName();
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
    this.__editUS.editUserStory(uid, sprintId, this.userStory);
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
    this.__editUS.editUserStory(uid, sprintId, this.userStory);
  }

  onDelete(id){
    this.__rcService.deleteUserStory(id);
    // this.__rcService.getDeletedUserStories(this.__rcService.sopId);
  }
}
