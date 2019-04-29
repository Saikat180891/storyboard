import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { DownloadableEpics } from "../export-sop-as-word/export-sop-as-word.component";
import { ExportToWordModalComponent } from "./export-to-word-modal.component";
@Injectable({
  providedIn: "root",
})
export class ExportToWordModalService {
  constructor(public dialog: MatDialog) {}

  openDialog(chapters: DownloadableEpics[]): Observable<any> {
    const dialogRef = this.dialog.open(ExportToWordModalComponent, {
      width: "500px",
      height: "489px",
      data: { chapters },
    });

    return dialogRef.afterClosed();
  }
}
