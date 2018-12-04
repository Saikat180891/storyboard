import { Component, OnInit, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import {TableService} from './table.service';
import {ReasonCodeService} from '../../reasoncodes/reason-code.service';

export interface Userstories {
  id: number;
  sprint: number;
  us: number;
  uname: string;
  priority: string;
  rules: string;
  verified: string;
  fte: number;
  devhrs: number;
  notes: string;
  status: string;
  btn: string;
}

const ELEMENT_DATA: Userstories[] = [
  {id: 1, sprint: 1, us: 1, uname: 'lorem ipsum', priority: 'high', rules: 'yes', verified: 'yes', fte: 2.3, devhrs: 32, notes: 'hello', status: 'Backlog', btn: 'ok'},
  {id: 2, sprint: 2, us: 1, uname: 'lorem ipsum', priority: 'high', rules: 'yes', verified: 'yes', fte: 2.3, devhrs: 32, notes: 'hello', status: 'Rules', btn: 'ok'},
  {id: 3, sprint: 3, us: 1, uname: 'lorem ipsum', priority: 'high', rules: 'yes', verified: 'yes', fte: 2.3, devhrs: 32, notes: 'hello', status: 'Done', btn: 'ok'}
];


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input('dataSource') dataSource:  Userstories[];

  @Input('sprint') sprint;

  options = [1,2,3];

  createUserStory:boolean = false;

  sprint_id:number;

  confirmDelete:boolean = false;

  userStoryToDelete;

  currentUserStoryToEdit = {
    sprint_id: this.sprint_id,
  };

  userStory = {
    us_number: '',
    us_name: '',
    priority: '',
    rules_approved: '',
    verified_test_cases: '',
    ftes: '',
    dev_hrs: '',
    notes: '',
    status: ''
  }

  id = -1;

  priority = ['High', 'Medium', 'Low'];

  rulesApproved = ['Yes', 'No'];

  status = ['Backlog', 'Rules', 'Intl Testing', 'Ext Testing', 'Done'];

  ifEdit = true;

  // dataSource = ELEMENT_DATA;

  constructor(private _tableService: TableService,
              private _rcService: ReasonCodeService) { }

  ngOnInit() {
    this._tableService.getUserStory();
  }

  onChangeSprint(event){
    this.sprint_id = event;
  }

  onChangeStatus(event){
    this.userStory.status = event;
  }

  onChangePriority(event){
    this.userStory.priority = event;
  }

  onChangeRulesApp(event){
    this.userStory.rules_approved = event;
  }

  onChangeVTC(event){
    this.userStory.verified_test_cases = event;
  }

  onEditSprint(event){
    this.currentUserStoryToEdit.sprint_id = event;
  }

  onEdit(id){
    this.id = id;
    this._tableService.userStories.forEach(element=>{
      if(element.id === this.id){
        this.userStory = element;
        this.currentUserStoryToEdit = Object.assign(this.currentUserStoryToEdit, this.userStory);
      }
    });
    // console.log(this.currentUserStoryToEdit)
  }

  onClose(){
    this.id = -1;
  }

  onCreateUserStory(){
    this.createUserStory = !this.createUserStory;
  }

  clearUserStory(){
    this.userStory = {
      us_number: '',
      us_name: '',
      priority: '',
      rules_approved: '',
      verified_test_cases: '',
      ftes: '',
      dev_hrs: '',
      notes: '',
      status: ''
    }
  }

  onCreate(){
    this._tableService.createUserStory(this.sprint_id, this.userStory);
    // this._rcService.getChartData(this.sprint_id);
    // console.log(this.userStory);
    this.clearUserStory();
    this.createUserStory = false;
  }

  onSaveUserStory(usID){
    delete this.currentUserStoryToEdit["id"];
    delete this.currentUserStoryToEdit["sprint_name"];
    let sprintID = this.currentUserStoryToEdit["sprint_id"];
    delete this.currentUserStoryToEdit["sprint_id"];
    console.log(usID, sprintID, this.currentUserStoryToEdit);
    this._tableService.editUserStory(usID, sprintID, this.userStory);
    this._rcService.getTotalCharData(this._rcService.sopId);
    this.onClose();
  }

  onDelete(id){
    this._tableService.deleteUserStory(id);
    this.confirmDelete = false;
  }

  onMove(id){
    this._rcService.movemodal = true;
  }

  onCallConfirm(data){
    this.userStoryToDelete = data;
    this.confirmDelete = true;
    console.log(data)
  }

  onConfirmCancel(){
    this.confirmDelete = false;
  }
}
