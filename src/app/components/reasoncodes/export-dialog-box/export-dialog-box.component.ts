import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReasonCodeService } from '../reason-code.service';

@Component({
  selector: 'export-dialog-box',
  templateUrl: './export-dialog-box.component.html',
  styleUrls: ['./export-dialog-box.component.scss']
})
export class ExportDialogBoxComponent implements OnInit {
  @Output('close') close = new EventEmitter<boolean>();
  sidebarLinks = ['Audit Trail'];
  linkSelected:number = 0;
  show_dates: boolean= false;
  startDate = ""
  endDate = ""
  projectTypeSelected;
  startDateValidator: boolean = false;
  endDateValidator: boolean = false;

  constructor(private __rcService:ReasonCodeService) { }

  ngOnInit() {
  }

  onSelect(i){
    this.linkSelected = i;
  }

  onTimedProject(){
    this.show_dates = true;
  }

  onEntireProject(){
    this.show_dates = false;
  }

  onExportAuditTrail(){
    console.log(this.projectTypeSelected)
    
    if(this.projectTypeSelected == 2 && this.startDate && this.endDate)
    {
    let startDate = this.reArrangeDate(this.startDate);
    let endDate = this.reArrangeDate(this.endDate);
      this.__rcService.downLoadAuditTrailFile(this.__rcService.sopId, startDate, endDate);
    }
    else{
      this.__rcService.downLoadAuditTrailFile(this.__rcService.sopId);
    }
    this.onClose()
  }

  reArrangeDate(date){
    
    let newDate = new Date(date);

    let strDate = newDate.getFullYear() + "-" + (newDate.getMonth() + 1)+ "-" + newDate.getDate();
    
    return strDate;
  }

  onClose(){
    this.close.emit(false);
  }
}
