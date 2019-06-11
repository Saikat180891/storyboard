import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

export interface DialogData {
  options: Array<any>;
  sectionName: string;
}

@Component({
  selector: "app-confirm-modal-with-options",
  templateUrl: "./confirm-modal-with-options.component.html",
  styleUrls: ["./confirm-modal-with-options.component.scss"],
})
export class ConfirmModalWithOptionComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmModalWithOptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onButtonSelected(status: boolean): void {
    this.dialogRef.close(status);
  }
  onNoClick(): void {
    this.dialogRef.close("cancel");
  }
}
