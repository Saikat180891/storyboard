import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { Audit } from "../export-dialog-box/export-dialog-box.component";
import { Export } from "../export-sop-as-word/export-sop-as-word.component";
export enum DownloadFileType {
  AUDIT = "audit",
  EXPORT = "export",
}
@Component({
  selector: "app-export-to-word-modal",
  templateUrl: "./export-to-word-modal.component.html",
  styleUrls: ["./export-to-word-modal.component.scss"],
})
export class ExportToWordModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ExportToWordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onReceivePayload($event: Export | Audit): void {
    this.dialogRef.close($event);
  }
}
