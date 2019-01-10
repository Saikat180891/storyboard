import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, AfterViewChecked, HostListener } from '@angular/core';
import {ReasonCodeService} from '../reason-code.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {fromEvent} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {SharedServicesService} from '../../../shared-services/shared-services.service';

interface SprintConfig{
  duration: string;
  end_date: string;
  sprint_name: string;
  start_date: string;
}

interface ReasonCode{
  id?: number;
  name: string;
}

@Component({
  selector: 'sprint-config',
  templateUrl: './sprint-config.component.html',
  styleUrls: ['./sprint-config.component.scss']
})
export class SprintConfigComponent implements OnInit, AfterViewChecked {

  @ViewChild('sprintContainer') sprintContainer: ElementRef;
  @ViewChild('rcContainer') rcContainer: ElementRef;

  @Output('closeSprints') closeSprints = new EventEmitter<boolean>();

  /**
   * sprintConfigData contains an array of objects which is aquired from the backend to 
   * display the number of sprints
   */
  @Input('sprintConfigData') sprintConfigData;

  /**
   * reasonCodeConfigData contains an array of objects which is aquired from the backend to 
   * display the number of reason-codes / epics
   */
  @Input('reasonCodeConfigData') reasonCodeConfigData;

  /**
   * this is a dynamic variable where array elements are created by user interaction
   * when the user clicks on the ssave all button all the elements in the array list
   * is sent to the backend one by one
   */
  addNewRow:SprintConfig[] = [];

  /**
   * same as addNewRow, but this is used for creating epics
   */
  addNewRowForReasonCode:ReasonCode[] = [];

  /**
   * a flag to display show the warning depending on the user behaviour
   */
  displayWarningBox:boolean = false;
  
  sprintToDeleteId:number;
  
  sprintNameToDelete:string = '';

  cancel:boolean = false;

  warning:boolean = false;

  warningBoxForCancel:boolean = false;

  reasonCodeEditChangeDetector = [];

  validateCheckBox: boolean = false;

  validateFileExtension: boolean = false;

  file_name:string = "";

  uploadForm = this.formBuilder.group({
    upload_file: ['', Validators.required],
    confirm_template_checkbox : false
  });

  excelFile = new FormData();
  //this variable is used to detect if there is any change in the 'sprintConfigData' array
  changedDetected:boolean[] = [];

  constructor(
    private __rcService:ReasonCodeService, 
    private spinner: NgxSpinnerService, 
    private formBuilder:FormBuilder, 
    private __sharedService: SharedServicesService
    ) { }

  @HostListener('document:keyup.escape', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.__sharedService.KEY_CODE.ESCAPE) {
      this.closeSprints.emit(false)
    } 
  }

  ngOnInit() {
    // fromEvent(this.sprintContainer.nativeElement, 'scroll')
    // .subscribe(res => {
    //   console.log(Number(res["target"].scrollTop.toFixed(0)));
    //   this.scrollTop = Number(res["target"].scrollTop.toFixed(0));
    // });
    
  }

  ngAfterViewChecked() {        
    // this.scrollToBottom();   
         
    this.sprintContainer.nativeElement.scrollTo({
      top: this.sprintContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
    this.rcContainer.nativeElement.scrollTo({
      top: this.rcContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  } 

  onClose(){
    this.cancel = true;
    if(this.changedDetected.length > 0 || this.addNewRow.length > 0){
      this.warningBoxForCancel = true;
    }else{
      this.addNewRow = [];
      this.changedDetected = [];
      this.closeSprints.emit(false);
    }
    this.__rcService.getBenefits(this.__rcService.sopId);          
    this.__rcService.getProjectStatusChartData(this.__rcService.sopId);
    this.__rcService.getProjectStatus(this.__rcService.sopId);
    this.__rcService.getCurrentSprintData(this.__rcService.sopId);
    this.__rcService.getSprintStatus(this.__rcService.sopId);
    this.__rcService.getUserStories(this.__rcService.sopId)
  }

  closeAll(){
    this.closeSprints.emit(false);
  }

  onSelectYes(){
    this.addNewRow = [];
    this.changedDetected = [];
    this.warningBoxForCancel = false;
    this.closeSprints.emit(false);
  }

  onAddSprints(element){
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
    if(this.addNewRow.length > 0){
      this.__rcService.createSprint(this.addNewRow);
      this.__rcService.getBenefits(this.__rcService.sopId);
      this.__rcService.getProjectStatusChartData(this.__rcService.sopId);
      this.__rcService.getProjectStatus(this.__rcService.sopId);
      this.__rcService.getCurrentSprintData(this.__rcService.sopId);
    }
    // else if(this.changedDetected.length === 0 && this.addNewRow.length === 0){
    //   this.onSelectYes();
    //   console.log("Nothing to change");
    // }
    if(this.changedDetected){
      this.changedDetected.forEach((element, index)=>{
        if(element === true){
          this.__rcService.editSprint(this.sprintConfigData[index].id, this.sprintConfigData[index]);
        }
      });
      this.__rcService.getBenefits(this.__rcService.sopId);          
      this.__rcService.getProjectStatusChartData(this.__rcService.sopId);
      this.__rcService.getProjectStatus(this.__rcService.sopId);
      this.__rcService.getCurrentSprintData(this.__rcService.sopId);
      this.__rcService.getSprintStatus(this.__rcService.sopId);
      this.__rcService.getUserStories(this.__rcService.sopId)
    }
    // else if(this.changedDetected.length === 0 && this.addNewRow.length === 0){
    //   this.onSelectYes();
    //   console.log("Nothing to change");
    // }
    // if(ack){
    //   this.addNewRow = [];
    //   console.log("Done")
    //   this.onSelectYes();
    //   this.spinner.hide();
    // }else{
    //   this.spinner.hide();
    // }
    this.spinner.hide();
    this.onSelectYes();
    // console.log(this.addNewRow);
    
  }

  deleteSprint(id, sprintName){
    this.sprintToDeleteId = id;
    this.sprintNameToDelete = sprintName;
    this.displayWarningBox = true;
  }

  onDoNotDelete(){
    this.displayWarningBox = false;
    this.__rcService.getBenefits(this.__rcService.sopId);          
    this.__rcService.getProjectStatusChartData(this.__rcService.sopId);
    this.__rcService.getProjectStatus(this.__rcService.sopId);
    this.__rcService.getCurrentSprintData(this.__rcService.sopId);
    this.__rcService.getSprintStatus(this.__rcService.sopId);
  }

  onDelete(){
    this.__rcService.deleteSprint(this.sprintToDeleteId);
    this.displayWarningBox = false;
  }

  onDeleteRow(selected){
    this.addNewRow.splice(selected, 1);
    this.dateCounter = 0;
  }

  onAddRC(){
    let temObj = {
      name: 'Epics X'
    }
    this.addNewRowForReasonCode.push(temObj);
  }

  onSaveAllChangesInRC(){
    if(this.reasonCodeEditChangeDetector.length > 0){
      this.reasonCodeEditChangeDetector.forEach((element, index)=>{
        if(element){
          this.__rcService.editReasonCode(this.reasonCodeConfigData[index].id, this.reasonCodeConfigData[index]);
          this.__rcService.getProjectStatusChartData(this.__rcService.sopId);
        }
      });
    }else if(this.addNewRowForReasonCode.length > 0){
      this.addNewRowForReasonCode.forEach((element, index)=>{
        if(element.name === ''){
          let pos = this.addNewRowForReasonCode.indexOf(element);
          this.addNewRowForReasonCode.splice(pos, 1);
        }
      });
      this.__rcService.createReasonCode(this.__rcService.sopId, this.addNewRowForReasonCode);
      this.__rcService.getProjectStatusChartData(this.__rcService.sopId);

    }else if(this.reasonCodeEditChangeDetector.length > 0 || this.addNewRowForReasonCode.length > 0){
      this.addNewRowForReasonCode.forEach((element, index)=>{
        if(element.name === ''){
          let pos = this.addNewRowForReasonCode.indexOf(element);
          this.addNewRowForReasonCode.splice(pos, 1);
        }
        this.__rcService.createReasonCode(this.__rcService.sopId, this.addNewRowForReasonCode);
        this.__rcService.getProjectStatusChartData(this.__rcService.sopId);
      });
      this.reasonCodeEditChangeDetector.forEach((element, index)=>{
        if(element){
          this.__rcService.editReasonCode(this.reasonCodeConfigData[index].id, this.reasonCodeConfigData[index]);
          this.__rcService.getProjectStatusChartData(this.__rcService.sopId);
        }
      });
    }
    this.addNewRowForReasonCode = [];
    this.reasonCodeEditChangeDetector = [];
    this.closeSprints.emit(false);
    console.log(this.addNewRowForReasonCode);
  }

  onDeleteRC(selected){
    this.addNewRowForReasonCode.splice(selected, 1);
  }

  onReasonCodeEdit(index){
    this.reasonCodeEditChangeDetector[index] = true;
  }

  onDeleteCreatedRC(id){
    this.__rcService.deleteReasonCode(id);
    this.__rcService.getProjectStatusChartData(this.__rcService.sopId);
  }

  onDateSelected($event){
    console.log($event)
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  createEndDate(startDate, index, operation, weeks){
    let someDate = startDate;
    switch(operation){
      case 'add':
      someDate.setDate(someDate.getDate() + (weeks * 7) - 1); 
      break;
      case 'substract':
      if(weeks === 0){
        someDate.setDate(someDate.getDate() + weeks * 7);
        }
      else{
      someDate.setDate(someDate.getDate() + (weeks * 7) - 1);
      }
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
  lastIndex:number = -1;

  onArrowUp(index){
    if(this.lastIndex != index){
      this.dateCounter = 0;
      this.lastIndex = index;
    }

    if(this.addNewRow[index].duration){
      let durationSplitted = this.addNewRow[index].duration.split('');
      let period = durationSplitted.pop();
      let weeks = durationSplitted.join("");
      this.dateCounter = parseInt(weeks);
      this.addNewRow[index].duration = (this.dateCounter += 1) + 'W';
    }else if(this.addNewRow[index].start_date){
      this.addNewRow[index].duration = (this.dateCounter += 1) + 'W';
    }

    if(this.addNewRow[index].start_date){
      let startDate = new Date(JSON.parse(JSON.stringify(this.addNewRow[index])).start_date);

      this.createEndDate(startDate, index, 'add', this.dateCounter);
  
      console.log(this.lastIndex, this.dateCounter);

      this.warning = false;
    }else{
      this.warning = true;
    }

    // console.log(this.addNewRow[index]);
  }

  onArrowDown(index){
    if(this.lastIndex != index){
      this.dateCounter = 0;
      this.lastIndex = index;
    }

    if(this.addNewRow[index].duration){
      let durationSplitted = this.addNewRow[index].duration.split('');
      let period = durationSplitted.pop();
      let weeks = durationSplitted.join("");
      this.dateCounter = parseInt(weeks);
      if(this.dateCounter < 1){
        this.dateCounter = 0;
        // this.addNewRow[index].duration = this.dateCounter + 'W'
      }else{
      this.addNewRow[index].duration = (this.dateCounter -= 1) + 'W';
      }
    }else if(this.addNewRow[index].start_date){
      this.addNewRow[index].duration = (this.dateCounter -= 1) + 'W';
    }

    if(this.addNewRow[index].start_date){
      let startDate = new Date(JSON.parse(JSON.stringify(this.addNewRow[index])).start_date);

      this.createEndDate(startDate, index, 'substract', this.dateCounter);
  
      console.log(this.lastIndex, this.dateCounter);

      this.warning = false;
    }else{
      this.warning = true;
    }
  }
  /**
   * Change the end date if there is a change in the start date
   * @param $event 
   * @param index 
   */
  onDatePickerClose($event, index){
    this.sprintConfigData[index].start_date = $event.value;
    let date = new Date(JSON.parse(JSON.stringify($event.value)));

    let weeks = this.sprintConfigData[index].duration.split('');
    let period = weeks.pop();
    weeks = weeks.join("");
    let days = parseInt(weeks) * 7;
    let newDate = new Date(date.setDate(date.getDate() + days));

    let dd = newDate.getDate();
    let mm = newDate.getMonth() + 1;
    let y = newDate.getFullYear();
    this.sprintConfigData[index].end_date = dd + '/'+ mm + '/'+ y;
    console.log(date, this.sprintConfigData[index].end_date);
    this.changedDetected[index] = true;
  }

  onUpdateSprint(index){
    this.changedDetected[index] = true;
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateEndDate(startDate, index, operation, weeks){
    let someDate = startDate;
    console.log(someDate)
    switch(operation){
      case 'add':
      someDate.setDate(someDate.getDate() + (weeks * 7) - 1); 
      break;
      case 'substract':
      if(weeks === 0){
        someDate.setDate(someDate.getDate() + weeks * 7);
        }
      else{
      someDate.setDate(someDate.getDate() + (weeks * 7) - 1);
      }
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
    let startDate = new Date(JSON.parse(JSON.stringify(this.sprintConfigData[index])).start_date);
    this.updateEndDate(startDate, index, 'add', this.weekCounter);
    console.log(this.sprintConfigData[index]);
    this.changedDetected[index] = true;
  }

  onArrowDownforAlreadyCreated(index){
    let durationSplitted = this.sprintConfigData[index].duration.split('');
    let period = durationSplitted.pop();
    durationSplitted = durationSplitted.join("");
    this.weekCounter = parseInt(durationSplitted);

    // let startDate = this.sprintConfigData[index].start_date;
    // let endDate = new Date(this.sprintConfigData[index].end_date.split("/").reverse().join("-"));

    if(this.weekCounter < 1){
      this.weekCounter = 0;
    }else{
      this.sprintConfigData[index].duration = (this.weekCounter -= 1) + 'W';
      let startDate = new Date(JSON.parse(JSON.stringify(this.sprintConfigData[index])).start_date);
      this.updateEndDate(startDate, index, 'substract', this.weekCounter);

    }
    console.log(this.sprintConfigData[index]);
    this.changedDetected[index] = true;
    console.log(this.changedDetected)
  }

  onFileSelected(fileSelected){
    console.log("File Selected", fileSelected)
    
    if(fileSelected.target.files && fileSelected.target.files[0]){
      this.uploadForm.value.upload_file = fileSelected.target.files[0];
      this.excelFile.append("File", fileSelected.target.files[0]);
      console.log(this.file_name);
      this.file_name = fileSelected.target.files[0].name;
    }
  }

  validateFile(file){
    var file_extension="";
    if(file)
    {file_extension = file.name.split(".").pop();}
    console.log("File Extension", file_extension);
    if(file_extension == "xlsx"){
      this.validateFileExtension = false;
      return true;
  }
    else{
      this.validateFileExtension = true;
      return false;
    }
  }

  validateUploadForm(){
    if(this.uploadForm.value["confirm_template_checkbox"]){
      this.validateCheckBox = false;
      return this.validateFile(this.uploadForm.value["upload_file"])
    }
    else{
      this.validateCheckBox = true;
    }
    console.log(this.validateCheckBox)
    return false;
  }



  onUpload(){
    let validation = this.validateUploadForm();
    if(validation){
       this.__rcService.importStories(this.excelFile);
      this.onClose();
      }
  }

  oncheckBoxChange(value){
    console.log("Value",value);
    this.uploadForm.value["confirm_template_checkbox"] = value;
  }

  exportToExcel(){
    console.log("Downloading File");
    this.__rcService.downloadFile();
  }
}
