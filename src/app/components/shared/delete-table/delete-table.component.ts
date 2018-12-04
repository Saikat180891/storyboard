import { Component, OnInit } from '@angular/core';
// import {DeleteTableService} from './delete-table.service';
import {TableService} from '../table/table.service';

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
  selector: 'app-delete-table',
  templateUrl: './delete-table.component.html',
  styleUrls: ['./delete-table.component.scss']
})
export class DeleteTableComponent implements OnInit {
// @Input('dataSource') dataSource;

options = [1,2,3];

id = -1;

priority = ['High', 'Medium', 'Low'];

rulesApproved = ['Yes', 'No'];

status = ['Backlog', 'Rules', 'Intl Testing', 'Ext Testing', 'Done'];

ifEdit = true;

constructor(private _deleteTable: TableService) { }

ngOnInit() {
  this._deleteTable.getDeletedUserStories();
}

sprint(event){
  return event;
}

onEdit(id){
  this.id = id;
}

onClose(){
  this.id = -1;
}

onRestore(id){
  this._deleteTable.restoreUserStories(id);
}

}
