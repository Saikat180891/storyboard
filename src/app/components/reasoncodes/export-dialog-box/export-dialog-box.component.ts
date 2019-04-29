import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatRadioChange } from "@angular/material/radio";
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
  startDate: string = null;
  endDate: string = null;

  constructor(private reasonCodeService: ReasonCodeService) {}

  ngOnInit() {}

  onSelectionChange($event: MatRadioChange): void {
    if ($event.value === DownloadAuditType.TIME_FRAME) {
      this.disableDatePicker = false;
    } else {
      this.disableDatePicker = true;
      this.startDate = this.endDate = null;
    }
  }

  onExport(): void {
    this.audit.emit({
      type: DownloadFileType.AUDIT,
      startDate: this.startDate ? this.startDate : null,
      endDate: this.endDate ? this.endDate : null,
    });
  }

  onClose(): void {
    this.close.emit(false);
  }

  onDownloadFile(): void {
    this.reasonCodeService.downloadProject(this.reasonCodeService.sopId);
  }
}
