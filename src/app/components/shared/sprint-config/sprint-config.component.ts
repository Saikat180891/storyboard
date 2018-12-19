import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {ReasonCodeService} from '../../reasoncodes/reason-code.service';
import { NgxSpinnerService } from 'ngx-spinner';

interface SprintConfig{
  duration: string;
  end_date: string;
  sprint_name: string;
  start_date: string;
}

interface ReasonCode{
  id?: number;
  created: string;
}

@Component({
  selector: 'sprint-config',
  templateUrl: './sprint-config.component.html',
  styleUrls: ['./sprint-config.component.scss']
})
export class SprintConfigComponent implements OnInit {

  @Output('closeSprints') closeSprints = new EventEmitter<boolean>();

  @Input('sprintConfigData') sprintConfigData;

  @Input('reasonCodeConfigData') reasonCodeConfigData: ReasonCode[];

  addNewRow:SprintConfig[] = [];

  addNewRowForReasonCode:ReasonCode[] = [];

  displayWarningBox:boolean = false;

  sprintToDeleteId:number;
  sprintNameToDelete:string = '';

  cancel:boolean = false;

  constructor(private __rcService:ReasonCodeService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  onClose(){
    this.cancel = true;
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
  }

  onAddRC(){
    let temObj = {
      created: 'Reason Code X'
    }
    this.addNewRowForReasonCode.push(temObj);
  }

  onSaveAllChangesInRC(){
    console.log(this.addNewRowForReasonCode);
  }

  onDeleteRC(selected){
    this.addNewRowForReasonCode.splice(selected, 1);
  }

  createEndDate(startDate, index, operation){
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
    this.addNewRow[index].end_date = dd + '/'+ mm + '/'+ y;
}

  dateCounter:number = 0;

  onArrowUp(index){
    this.addNewRow[index].duration = (this.dateCounter += 1) + 'W';
    this.createEndDate(this.addNewRow[index].start_date, index, 'add');

    console.log(this.addNewRow[index])
  }

  onArrowDown(index){
    if(this.dateCounter <= 0){
      this.dateCounter = 0;
    }else{
      this.addNewRow[index].duration = (this.dateCounter -= 1) + 'W';
      this.createEndDate(this.addNewRow[index].start_date, index, 'substract');
    }
  }

  onDatePickerCloase($event, index){
    // this.sprintConfigData[index].start_date = $event.value;
    let date = $event.value;
    
    let durationSplitted = this.sprintConfigData[index].duration.split('');
    let period = durationSplitted.pop();
    durationSplitted = durationSplitted.join("");
    let days = parseInt(durationSplitted) * 7;

    let newDate = new Date(date.setDate(date.getDate() + days));

    let dd = newDate.getDate();
    let mm = newDate.getMonth() + 1;
    let y = newDate.getFullYear();
    this.sprintConfigData[index].end_date = dd + '/'+ mm + '/'+ y;

    this.__rcService.editSprint(this.sprintConfigData[index].id, this.sprintConfigData[index]);

    console.log(date, newDate)
  }

  onUpdateSprint(index){
    setTimeout(()=>{
      // if(this.cancel){
        this.__rcService.editSprint(this.sprintConfigData[index].id, this.sprintConfigData[index]);
        // this.cancel = false;
      // }
    }, 500);
  }

  updateEndDate(startDate, endDate, index, operation){
    let someDate = new Date(endDate.split('/').reverse().join('-'));
    console.log(someDate)
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
    this.sprintConfigData[index].end_date = dd + '/'+ mm + '/'+ y;
  }

  weekCounter:number = 0;

  onArrowUpforAlreadyCreated(index){
    let durationSplitted = this.sprintConfigData[index].duration.split('');
    let period = durationSplitted.pop();
    durationSplitted = durationSplitted.join("");
    this.weekCounter = parseInt(durationSplitted);
    
    this.sprintConfigData[index].duration = (this.weekCounter += 1) + 'W';
    this.updateEndDate(this.sprintConfigData[index].start_date, this.sprintConfigData[index].end_date, index, 'add');
    console.log(this.sprintConfigData[index]);

    this.__rcService.editSprint(this.sprintConfigData[index].id, this.sprintConfigData[index]);
  }

  onArrowDownforAlreadyCreated(index){
    let durationSplitted = this.sprintConfigData[index].duration.split('');
    let period = durationSplitted.pop();
    durationSplitted = durationSplitted.join("");
    this.weekCounter = parseInt(durationSplitted);

    if(this.weekCounter <= 0){
      this.weekCounter = 0;
    }else{
      this.sprintConfigData[index].duration = (this.weekCounter -= 1) + 'W';
      this.updateEndDate(this.sprintConfigData[index].start_date, this.sprintConfigData[index].end_date, index, 'substract');

      this.__rcService.editSprint(this.sprintConfigData[index].id, this.sprintConfigData[index]);
    }
  }

}
