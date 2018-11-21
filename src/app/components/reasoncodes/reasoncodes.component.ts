import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES: string[] = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
export interface Userstories {
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
  {sprint: 1, us: 1, uname: 'lorem ipsum', priority: 'high', rules: 'yes', verified: 'yes', fte: 2.3, devhrs: 32, notes: 'hello', status: 'testing', btn: 'ok'},
  {sprint: 2, us: 1, uname: 'lorem ipsum', priority: 'high', rules: 'yes', verified: 'yes', fte: 2.3, devhrs: 32, notes: 'hello', status: 'testing', btn: 'ok'},
  {sprint: 3, us: 1, uname: 'lorem ipsum', priority: 'high', rules: 'yes', verified: 'yes', fte: 2.3, devhrs: 32, notes: 'hello', status: 'testing', btn: 'ok'}
];

@Component({
  selector: 'app-reasoncodes',
  templateUrl: './reasoncodes.component.html',
  styleUrls: ['./reasoncodes.component.scss']
})
export class ReasoncodesComponent implements OnInit {
  panelOpenState = false;
  options = [1,2,3];

  displayedColumns: string[] = ['Sprint', 'U/S', 'User Story Name', 'Priority', 'Rules Approved', 'Verified Test Cases', 'FTE', 'Dev Hrs', 'Notes', 'Status', 'btn'];
  dataSource = ELEMENT_DATA;

  constructor() {

   }

  ngOnInit() {
    
  }

}
