import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {ReasonCodeService} from '../../reasoncodes/reason-code.service';
import {EditUserStoryService} from './edit-user-story.service';

@Component({
  selector: 'app-userstory-card-edit',
  templateUrl: './userstory-card-edit.component.html',
  styleUrls: ['./userstory-card-edit.component.scss']
})
export class UserstoryCardEditComponent implements OnInit {
  @Output('close') close = new EventEmitter();

  @Output('warning') warning = new EventEmitter();

  @Input('editUSData') editUSData;

  @Input('sprintOptions') sprintOptions;

  status='';
  editUSDatas;

  priorityOptions = [
    {
      status: 'High',
      color: '#FF3B3B'
    },
    {
      status: 'Medium',
      color: '#FF902E'
    },
    {
      status: 'Low',
      color: '#FDD468'
    }
  ];
  statusOptions = [
    {
      status: 'Backlog',
      color: '#2A7DE1'
    },
    {
      status: 'Rules',
      color: '#F47074'
    },
    {
      status: 'Intl Testing',
      color: '#0033A1'
    },
    {
      status: 'Ext Testing',
      color: '#FDD468'
    },
    {
      status: 'Done',
      color: '#40C0C4'
    }
  ];

  userStoryPayload = {
    us_number: '',
    us_name: '',
    priority: '',
    rules_approved: '',
    verified_test_cases: '',
    ftes: 0,
    dev_hrs: 0,
    notes: '',
    status: ''
  }
  
  productivity;

  constructor(
    private __rcService: ReasonCodeService, 
    private __editUS: EditUserStoryService) { }

  ngOnInit() {
    this.onUpdateProductivity();
    this.editUSData = JSON.parse(JSON.stringify(this.editUSData));
    this.editUSDatas = this.editUSData;
    this.__rcService.doneSelectStatus.subscribe(response=>{
      console.log("Subscribed Method", response)
      if(response){
        this.editUSData.status = 'Done';
      }else{
        this.editUSData.status = this.editUSDatas.status;
      }
    });
  }

  onClose(){
    this.close.emit(false);
    this.__editUS.selected = -1;
  }

  userStoryNumberValidator:boolean = false;
  userStoryNameValidator:boolean = false;
  userStoryPriorityValidator: boolean = false;
  userStorySprintNameValidator: boolean = false;
  userStoryStatusValidator: boolean = false;
  userStoryDescValidator: boolean = false;
  validationSuccessfull = [];

  onSaveAll(){
    console.log(this.editUSData);
    // this.statusSelected();
    // console.log(this.userStoryPayload)
    if(this.editUSData.us_number == ''){
      this.userStoryNumberValidator = true;
      this.validationSuccessfull[0] = 0;
    }else{
      this.userStoryNumberValidator = false;
      this.validationSuccessfull[0] = 1;
    }
    if(this.editUSData.us_name === ''){
      this.userStoryNameValidator = true;
      this.validationSuccessfull[1] = 0;
    }else{
      this.userStoryNameValidator = false;
      this.validationSuccessfull[1] = 1;
    }
    if(this.editUSData.priority == ''){
      this.userStoryPriorityValidator = true;
      this.validationSuccessfull[2] = 0;
    }else{
      this.userStoryPriorityValidator = false;
      this.validationSuccessfull[2] = 1;
    }
    if(this.editUSData.sprint_name == ''){
      this.userStorySprintNameValidator = true;
      this.validationSuccessfull[3] = 0;
    }else{
      this.userStorySprintNameValidator = false;
      this.validationSuccessfull[3] = 1;
    }
    if(this.editUSData.status === ''){
      this.userStoryStatusValidator = true;
      this.validationSuccessfull[4] = 0;
    }else{
      this.userStoryStatusValidator = false;
      this.validationSuccessfull[4] = 1;
    }
    if(this.editUSData.notes === ''){
      this.userStoryDescValidator = true;
      this.validationSuccessfull[5] = 0;
    }else{
      this.userStoryDescValidator = false;
      this.validationSuccessfull[5] = 1;
    }
    const value = this.validationSuccessfull.reduce((acc, val)=>{
      return acc + val;
    });
    if(value === 6){
      let sprintId = 0;
      this.__rcService.sprintConfig.forEach(element=>{
        if(element.sprint_name === this.editUSData.sprint_name){
          sprintId = element.id;
        }
      });
      if(this.editUSData.ftes === null ){
        delete this.editUSData.ftes;
      }
      if(this.editUSData.dev_hrs === null ){
        delete this.editUSData.dev_hrs;
      }
      console.log("From the edit user story",this.editUSData)
      this.__editUS.editUserStory(this.editUSData.id, sprintId, this.editUSData);
      this.onClose();
    }
  }

  onUpdateProductivity(){
    this.productivity = (parseFloat(this.editUSData.ftes) / parseFloat(this.editUSData.dev_hrs)).toFixed(1);
  }

  onSelectStatus($event){
    this.status = $event.status;
    if($event.status === 'Done'){
      this.warning.emit(true);
    }
  }
}
