import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {ReasonCodeService} from '../../reasoncodes/reason-code.service';
import { NgxSpinnerService } from 'ngx-spinner';

interface SprintConfig{
  duration: string;
  end_date: string;
  sprint_name: string;
  start_date: string;
}
@Component({
  selector: 'sprint-config',
  templateUrl: './sprint-config.component.html',
  styleUrls: ['./sprint-config.component.scss']
})
export class SprintConfigComponent implements OnInit {

  @Output('closeSprints') closeSprints = new EventEmitter<boolean>();

  @Input('sprintConfigData') sprintConfigData;

  addNewRow:SprintConfig[] = [];

  displayWarningBox:boolean = false;

  sprintToDeleteId:number;
  sprintNameToDelete:string = '';

  constructor(private __rcService:ReasonCodeService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  onClose(){
    this.addNewRow = [];
    this.closeSprints.emit(false);
  }

  onAddSprints(){
    let temObj = {
      duration: '',
      end_date: '',
      sprint_name: 'Sprint X',
      start_date: ''
    }
    this.addNewRow.push(temObj);
  }

  onSaveAllChanges(){
    this.spinner.show();
    let ack = this.__rcService.createSprint(this.addNewRow);
    if(ack){
      this.addNewRow = [];
      console.log("Done")
      this.onClose();
      this.spinner.hide();
    }else{
      this.spinner.hide();
    }
      this.spinner.hide();
    console.log(this.addNewRow)
  }

  deleteSprint(id, sprintName){
    this.sprintToDeleteId = id;
    this.sprintNameToDelete = sprintName;
    this.displayWarningBox = true;
  }

  onDoNotDelete(){
    this.displayWarningBox = false;
  }

  onDelete(){
    this.__rcService.deleteSprint(this.sprintToDeleteId);
    this.displayWarningBox = false;
  }

  onDeleteRow(selected){
    this.addNewRow.splice(selected, 1);
    console.log(selected)
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
    this.addNewRow.forEach(element=>{
      element.end_date = mm + '/'+ dd + '/'+ y;
    })
  }

  // {
  //   duration: "3W",
  //   end_date: "1/9/2019",
  //   id: 11,
  //   sprintNumber: 3,
  //   sprint_name: "sprint 6",
  //   start_date: Wed Jan 09 2019 18:55:38 GMT+0530 (India Standard Time) {}
  // }

}
