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

  @Input('editUSData') editUSData;

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

  constructor(private __rcService: ReasonCodeService, private __editUS: EditUserStoryService) { }

  ngOnInit() {
    this.onUpdateProductivity();
    this.editUSData = JSON.parse(JSON.stringify(this.editUSData));
  }

  onClose(){
    this.close.emit(false);
  }

  onSaveAll(){
    console.log(this.editUSData);
    let sprintId = 0;
    this.__rcService.sprintConfig.forEach(element=>{
      if(element.sprint_name === this.editUSData.sprint_name){
        sprintId = element.id;
      }
    });
    this.__editUS.editUserStory(this.editUSData.id, sprintId, this.editUSData);
    this.onClose();
  }

  onUpdateProductivity(){
    this.productivity = (parseFloat(this.editUSData.ftes) / parseFloat(this.editUSData.dev_hrs)).toFixed(1);
  }

  
}
