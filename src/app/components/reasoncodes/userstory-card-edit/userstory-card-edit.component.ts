import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import {ReasonCodeService} from '../reason-code.service';
import {EditUserStoryService} from './edit-user-story.service';
import {SharedServicesService} from '../../../services/shared-services/shared-services.service';

interface UserStory{
  us_number: string;
  us_name: string;
  priority: string;
  rules_approved: boolean;
  verified_test_cases: boolean;
  ftes: any;
  dev_hrs: any;
  notes: string;
  status: string;
  created: string
  sprint_name: string;
  planned_delivery: any;
  revised_delivery: any;
}

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

  @Input('reasonCodeOptions') reasonCodeOptions;

  status='';
  editUSDatas;
  checked:boolean = false;

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
      status: 'Development',
      color: '#69D100'
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

  // userStoryPayload: UserStory = {
  //   us_number: '',
  //   us_name: '',
  //   priority: '',
  //   rules_approved: '',
  //   verified_test_cases: '',
  //   ftes: 0,
  //   dev_hrs: 0,
  //   notes: '',
  //   status: ''
  // }
  
  productivity;

  constructor(
    private __rcService: ReasonCodeService, 
    private __editUS: EditUserStoryService,
    private __sharedService: SharedServicesService) { }

  ngOnInit() {
    this.onUpdateProductivity();
    this.editUSData = JSON.parse(JSON.stringify(this.editUSData));
    this.editUSData.planned_delivery = this.formatDateToDisplay(this.editUSData.planned_delivery);
    if(this.editUSData.revised_delivery != '-----'){
      this.activateRevisedDelivery = true;
      this.checked = true;
    }
    this.editUSData.revised_delivery = this.formatDateToDisplay(this.editUSData.revised_delivery);
    this.editUSDatas = this.editUSData;
    // console.log("Edit user stories", this.editUSData)
    this.__rcService.doneSelectStatus.subscribe(response=>{
      // console.log("Subscribed Method", response)
      if(response){
        this.editUSData.status = 'Done';
      }else{
        this.editUSData.status = this.editUSDatas.status;
      }
    });
  }

  @HostListener('document:keyup.escape', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.__sharedService.KEY_CODE.ESCAPE) {
      this.onClose();
    } 
  }

  onClose(){
    this.close.emit(false);
    this.__editUS.selected = -1;
  }

  formatDateToDisplay(date){
    let newDate = date.split("/").reverse().join("-");
    return new Date(newDate);
  }

  formatDateToSend(date){
    let newDate = new Date(date);
    return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
  }

  userStoryNumberValidator:boolean = false;
  userStoryNameValidator:boolean = false;
  userStoryPriorityValidator: boolean = false;
  userStorySprintNameValidator: boolean = false;
  userStoryStatusValidator: boolean = false;
  userStoryDescValidator: boolean = false;
  userStoryReasonCodeValidator: boolean = false;
  validationSuccessfull = [];

  onSaveAll(){
    // console.log(this.editUSData);

    this.editUSData.planned_delivery = this.__editUS.formatDateToSendData(this.editUSData.planned_delivery);
    // console.log(this.editUSData);
    isNaN(this.editUSData.revised_delivery) || this.editUSData.revised_delivery == null ? this.editUSData.revised_delivery = null : this.editUSData.revised_delivery = this.__editUS.formatDateToSendData(this.editUSData.revised_delivery);


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
    if(this.editUSData.rc_name === ''){
      this.userStoryReasonCodeValidator = true;
      this.validationSuccessfull[6] = 0;
    }else{
      this.userStoryReasonCodeValidator = false;
      this.validationSuccessfull[6] = 1;
    }
    const value = this.validationSuccessfull.reduce((acc, val)=>{
      return acc + val;
    });
    if(value === 7){
      let sprintId = 0;
      this.__rcService.sprintConfig.forEach(element=>{
        if(element.sprint_name === this.editUSData.sprint_name){
          sprintId = element.id;
        }
      });
      this.editUSData.dev_hrs = parseFloat(this.editUSData.dev_hrs).toFixed(1);
      this.editUSData.ftes = parseFloat(this.editUSData.ftes).toFixed(1);
      if(this.editUSData.ftes === null || this.editUSData.ftes === '' || this.editUSData.ftes === '-----' || isNaN(this.editUSData.ftes)){
        this.editUSData.ftes = 0.0;
      }
      if(this.editUSData.dev_hrs === null || this.editUSData.dev_hrs === '' || this.editUSData.dev_hrs === '-----' || isNaN(this.editUSData.dev_hrs)){
        this.editUSData.dev_hrs = '';
      }
      console.log("From the edit user story",this.editUSData);
      let rc_id = 0;
      this.__rcService.reasonCodeData.forEach(element=>{
        if(element.name === this.editUSData.rc_name){
          rc_id = element.id;
        }
      });
      // if(isNaN(this.editUSData.revised_delivery) || this.editUSData.revised_delivery === '-----' ){
      //   this.editUSData.revised_delivery = null;
      // }
      this.__editUS.editUserStory(this.editUSData.id, sprintId, rc_id, this.editUSData);
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
    }else{
      this.editUSData.status = $event.status;
    }
  }

  onSprintSelect($event){
    this.editUSData.sprint_name=$event.status;
    console.log(this.__rcService.sprintConfig)
    this.__rcService.sprintConfig.forEach(element=>{
      if(element.sprint_name === this.editUSData.sprint_name){
        let date = new Date(JSON.parse(JSON.stringify(element.end_date.split("/").reverse().join("-"))));
        this.editUSData.planned_delivery = date;
      }
    });
  }


  onDatePickerClosePD($event){
    this.editUSData.planned_delivery = $event.value;
  }

  onDatePickerCloseRD($event){
    this.editUSData.revised_delivery = $event.value;
  }

  activateRevisedDelivery: boolean = false;
  onRDChecked(value){
    this.activateRevisedDelivery = value;
    if(value == false){
      this.editUSData.revised_delivery = null;
    }
  }
}
