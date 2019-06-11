import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { MessageDialogComponent } from "./message-dialog.component";

@Injectable({
  providedIn: "root",
})
export class MessageDialogService {
  constructor(private dialog: MatDialog) {}

  public openMessageDialog(sectionName: string, options: any[]) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: "33rem",
      height: "15rem",
      data: { sectionName, options },
    });
    return dialogRef.afterClosed();
  }
}
