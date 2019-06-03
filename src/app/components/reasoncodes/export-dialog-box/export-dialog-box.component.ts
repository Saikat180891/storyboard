import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  wtfEndTimeRange,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatRadioChange } from "@angular/material/radio";
import { convertDateforBackend } from "../../shared/date-utils";
import { DownloadFileType } from "../export-to-word-modal/export-to-word-modal.component";
import { ReasonCodeService } from "../reason-code.service";

export enum DownloadAuditType {
  SINCE_CREATED = 0,
  TIME_FRAME = 1,
}
export interface Audit {
  type: string;
  startDate?: string;
  endDate?: string;
}
@Component({
  selector: "export-dialog-box",
  templateUrl: "./export-dialog-box.component.html",
  styleUrls: ["./export-dialog-box.component.scss"],
})
export class ExportDialogBoxComponent implements OnInit {
  @Output("close") close = new EventEmitter<boolean>();
  @Output("audit") audit = new EventEmitter<Audit>();
  auditTypes = ["Since Created", "Time Frame"];
  projectTypeSelected = 0;
  disableDatePicker: boolean = true;
  invalidDates: boolean = false;
  maxDate: Date = new Date();

  exportForm = new FormGroup({
    startDate: new FormControl(
      { value: "", disabled: true },
      Validators.required
    ),
    endDate: new FormControl(
      { value: "", disabled: true },
      Validators.required
    ),
  });

  constructor(private reasonCodeService: ReasonCodeService) {}

  ngOnInit() {}

  onSelectionChange($event: MatRadioChange): void {
    if ($event.value === DownloadAuditType.TIME_FRAME) {
      this.disableDatePicker = false;
      this.exportForm.controls["startDate"].enable();
      this.exportForm.controls["endDate"].enable();
    } else {
      this.disableDatePicker = true;
      this.exportForm.controls["startDate"].disable();
      this.exportForm.controls["endDate"].disable();
    }
  }

  validateExportDates() {
    this.exportForm.controls.startDate.markAsTouched();
    this.exportForm.controls.endDate.markAsTouched();
    const startDate = this.exportForm.value.startDate;
    const endDate = this.exportForm.value.endDate;
    if (this.exportForm.valid && startDate && endDate) {
      this.invalidDates = startDate > endDate;
      return !this.invalidDates;
    }
    return false;
  }

  onExport(): void {
    if (
      this.disableDatePicker ||
      (this.validateExportDates() && this.exportForm.valid)
    ) {
      this.audit.emit({
        type: DownloadFileType.AUDIT,
        startDate: this.exportForm.value.startDate
          ? convertDateforBackend(this.exportForm.value.startDate)
          : null,
        endDate: this.exportForm.value.endDate
          ? convertDateforBackend(this.exportForm.value.endDate)
          : null,
      });
    }
  }

  onClose(): void {
    this.close.emit(false);
  }

  onDownloadFile(): void {
    this.reasonCodeService.downloadProject(this.reasonCodeService.sopId);
  }
}
