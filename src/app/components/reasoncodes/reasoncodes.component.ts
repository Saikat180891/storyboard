import { Component, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import {ReasonCodeService} from './reason-code.service';
import {ContainerService} from '../container/container.service';
import {TableService} from '../shared/table/table.service';
import {DeleteTableService} from '../shared/delete-table/delete-table.service';


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

export interface SprintConfig{
  sprint_name: string;
  start_date: string;
  duration: string;
  end_date: string;
}

export interface ReceivedSprintConfig{
  id:number;
  sprint_name: string;
  start_date: string;
  duration: string;
  end_date: string;
}

const ELEMENT_DATA: Userstories[] = [
  {id: 1, sprint: 1, us: 1, uname: 'lorem ipsum', priority: 'high', rules: 'yes', verified: 'yes', fte: 2.3, devhrs: 32, notes: 'hello', status: 'Backlog', btn: 'ok'},
  {id: 2, sprint: 2, us: 1, uname: 'lorem ipsum', priority: 'high', rules: 'yes', verified: 'yes', fte: 2.3, devhrs: 32, notes: 'hello', status: 'Rules', btn: 'ok'},
  {id: 3, sprint: 3, us: 1, uname: 'lorem ipsum', priority: 'high', rules: 'yes', verified: 'yes', fte: 2.3, devhrs: 32, notes: 'hello', status: 'Done', btn: 'ok'}
];



@Component({
  selector: 'app-reasoncodes',
  templateUrl: './reasoncodes.component.html',
  styleUrls: ['./reasoncodes.component.scss', './move-user-story.scss','draggable.scss']
})
export class ReasoncodesComponent implements OnInit {
  panelOpenState = false;
  options = [1,2,3];
  displayedColumns: string[] = ['Sprint', 'U/S', 'User Story Name', 'Priority', 'Rules Approved', 'Verified Test Cases', 'FTE', 'Dev Hrs', 'Notes', 'Status', 'btn'];
  dataSource = ELEMENT_DATA;
  openAddSprint = false;
  sopId:number;
  dateCounter:number = 0;
  
  addSprintPayload:SprintConfig = {
    sprint_name: '',
    start_date: '',
    duration: '',
    end_date: ''
  };

  validateSprintConfig = {
    start_date: true,
    duration: true,
    end_date: true
  }

  currentSprintData;

  currentProject;

  currentSprintOptions = {
    chart: {
        type: 'pieChart',
        height: 200,
        width: 400,
        margin: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        },
        x: function(d){return d.key;},
        y: function(d){return d.y;},
        showLabels: false,
        duration: 500,
        donutRatio: 0.6,
        donut:true,
        legendPosition: 'right',
        // title: 'Hello',
        labelThreshold: 0.07,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 20,
            right: 10,
            bottom: 0,
            left: 20
          },
          width: 50,
          height: 200,
          rightAlign: true
        }
      }
    };

  receivedSprintConfig:ReceivedSprintConfig;

  addSprint = [this.addSprintPayload];

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  constructor(private route: ActivatedRoute,
              private _reasonCode: ReasonCodeService,
              private _containerService: ContainerService,
              private _tableService: TableService,
              private _deletedTable: DeleteTableService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._reasonCode.sopId = parseInt(params.id);
      this._containerService.cardContents.forEach(element => {
        if(element.id == this._reasonCode.sopId){
          this.currentProject = element;
        }
      });
      console.log("Current project is",this.currentProject);
   });

   this._reasonCode.getSopByID(this._reasonCode.sopId);
   this._reasonCode.getSprint();
   this._reasonCode.getTotalCharData(this._reasonCode.sopId);
   
   
   console.log(this._reasonCode.sprintConfig);
  }

  onSelectDeletedUS(){
    console.log("deleted us")
    // this._deletedTable.getDeletedUserStories();
  }

  getChart(){
    this._reasonCode.getChartData(35);
  }

  onAddSprint(){
    // this.addSprint.push(this.addSprintPayload);
    console.log(this.addSprintPayload)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  onOpenAddSprint(){
    this._reasonCode.getSprint();
    console.log(this._reasonCode.sprintConfig)
    this.openAddSprint = !this.openAddSprint;
  }

  onCloseAddSprint(){
    this.openAddSprint = false;
  }

  onSaveSprint(){
    this.addSprintPayload.start_date = this.formatDate(this.addSprintPayload.start_date);
    this._reasonCode.createSprint(this.addSprintPayload);
    this.addSprintPayload = {
      sprint_name: '',
      start_date: '',
      duration: '',
      end_date: ''
    };
    console.log("Received data",this._reasonCode.sprintConfig);
  }

  onDeleteSprint(id){
    this._reasonCode.deleteSprint(id);
    setTimeout(()=>{
      this._tableService.getUserStory();
    },500);
  }

  onEditSprint(event, id, data){
    // data['start_date'] = this.formatDate(data['start_date']);
    setTimeout(()=>{
      this._reasonCode.editSprint(id, data);
    }, 500);
  }

  createEndDate(startDate, numberOfDaysToAdd, operation){
    let someDate = startDate;
    switch(operation){
      case 'add':
      someDate.setDate(someDate.getDate() + 7); 
      break;
      case 'substract':
      someDate.setDate(someDate.getDate() - 7); 
      break;
      default:
      break;
    }
    
    let dd = someDate.getDate();
    let mm = someDate.getMonth() + 1;
    let y = someDate.getFullYear();
    this.addSprintPayload.end_date = mm + '/'+ dd + '/'+ y;
  }

  onCancel(){
    this._reasonCode.movemodal = false;
  }

  onArrowUp(){
    // this.dateCounter += 1;
    this.addSprintPayload.duration = (this.dateCounter += 1) + 'W';
    // let days = this.dateCounter * 7;
    this.createEndDate(this.addSprintPayload.start_date, this.addSprintPayload.duration, 'add');
  }

  onArrowDown(){
    if(this.dateCounter <= 0){
      this.dateCounter = 0;
    }else{
      // this.dateCounter -= 1;
      this.addSprintPayload.duration = (this.dateCounter -= 1) + 'W';
      // let days = this.dateCounter * 7;
      this.createEndDate(this.addSprintPayload.start_date, this.addSprintPayload.duration, 'substract');
    }
    
  }

  validateSprint(sprintDetails){
    console.log(sprintDetails)
    if(sprintDetails.sprint_name != ''){
      this.validateSprintConfig.start_date = false;
    }
    if(this.formatDate(sprintDetails.start_date) != ''){
      this.validateSprintConfig.duration = false;
      this.validateSprintConfig.end_date = false;
    }
    if(sprintDetails.sprint_name === ''){
      this.validateSprintConfig = {
        start_date: true,
        duration: true,
        end_date: true
      }
    }
  }

  /**
   * Rearrange the date in the following format DD/MM/YYYY
   * @param date 
   */
  formatDate(date){
    let dateStr = new Date(date)
    let strDate =  "" + dateStr.getDate() + "/" + (dateStr.getMonth()+1) + "/" + dateStr.getFullYear();
    return strDate;
  }
  
  /**
   * Format the year as 00YY
   * @param year 
   */
  formatYear(year){
    let digits = year.toString().split("");
    return ""+ digits[2] + digits[3];
  }


}
