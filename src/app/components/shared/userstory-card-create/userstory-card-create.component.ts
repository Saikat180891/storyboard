import { Component, OnInit, Output, EventEmitter, OnChanges, Input } from '@angular/core';
import {ReasonCodeService} from '../../reasoncodes/reason-code.service';
import {CreateUserstoryService} from './create-userstory.service';
import { fromEvent } from 'rxjs';


@Component({
  selector: 'app-userstory-card-create',
  templateUrl: './userstory-card-create.component.html',
  styleUrls: ['./userstory-card-create.component.scss']
})
export class UserstoryCardCreateComponent implements OnInit, OnChanges {
  @Output('close') close = new EventEmitter<boolean>();

  @Input('sprintOptions') sprintOptions;

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
      status: 'BackLog',
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
  edit:boolean = true;

  userStoryPayload = {
    us_number: '',
    us_name: '',
    priority: '',
    rules_approved: false,
    verified_test_cases: false,
    ftes: '',
    dev_hrs: '',
    notes: '',
    status: '',
    created: '',
    sprint_name: ''
  }
  productivity;

  constructor(private __rcService: ReasonCodeService,
              private __createUserStory: CreateUserstoryService) { }

  ngOnInit() {

  }

  

  ngOnChanges(){
    this.productivity = (parseFloat(this.userStoryPayload.dev_hrs) / parseFloat(this.userStoryPayload.ftes)).toFixed(2);
  }

  onClose(){
    this.close.emit(false);
  }

  onEdit(){
    this.edit = !this.edit;
  }

  onCreate(){
    let id:number;
    this.__rcService.sprintConfig.forEach(element=>{
      if(element.sprint_name == this.userStoryPayload.sprint_name){
        id = element.id;
      }
    });
    this.__createUserStory.createUserStory(id, this.userStoryPayload);
    this.close.emit(false);
  }

  onRulesApproved(event){
    console.log("The rules approved", event);
  }

}
