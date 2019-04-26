import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { FileAttachmentComponent } from "./file-attachment.component";

@Injectable({
  providedIn: "root",
})
export class FileAttachmentService {
  constructor(private dialog: MatDialog) {}

  private openDialog(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(FileAttachmentComponent, {
      width: "30rem",
      height: "15rem",
      data: { message },
    });
    return dialogRef.afterClosed();
  }

  public openFileAttachmentDialog(message: string): Observable<any> {
    return this.openDialog(message);
  }
}
