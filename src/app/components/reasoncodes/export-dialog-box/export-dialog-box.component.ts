import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ReasonCodeService } from "../reason-code.service";

@Component({
  selector: "export-dialog-box",
  templateUrl: "./export-dialog-box.component.html",
  styleUrls: ["./export-dialog-box.component.scss"],
})
export class ExportDialogBoxComponent implements OnInit {
  @Output("close") close = new EventEmitter<boolean>();
  sidebarLinks = ["Audit Trail"];
  linkSelected: number = 0;
  show_dates: boolean = false;
  startDate = "";
  endDate = "";
  projectTypeSelected;
  startDateValidator: boolean = false;
  endDateValidator: boolean = false;

  constructor(private __rcService: ReasonCodeService) {}

  ngOnInit() {}

  onSelect(i) {
    this.linkSelected = i;
  }

  onTimedProject() {
    this.show_dates = true;
  }

  onEntireProject() {
    this.show_dates = false;
  }

  onExportAuditTrail() {
    if (this.projectTypeSelected == 2 && this.startDate && this.endDate) {
      const startDate = this.reArrangeDate(this.startDate);
      const endDate = this.reArrangeDate(this.endDate);
      this.__rcService.downLoadAuditTrailFile(
        this.__rcService.sopId,
        startDate,
        endDate
      );
    } else {
      this.__rcService.downLoadAuditTrailFile(this.__rcService.sopId);
    }
    this.onClose();
  }

  reArrangeDate(date) {
    const newDate = new Date(date);

    const strDate =
      newDate.getFullYear() +
      "-" +
      (newDate.getMonth() + 1) +
      "-" +
      newDate.getDate();

    return strDate;
  }

  onClose() {
    this.close.emit(false);
  }
}
