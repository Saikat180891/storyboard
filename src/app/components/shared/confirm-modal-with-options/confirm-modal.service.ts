import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { ConfirmModalWithOptionComponent } from "./confirm-modal-with-options.component";
@Injectable({
  providedIn: "root",
})
export class ConfirmModalWithOptionService {
  constructor(private dialog: MatDialog) {}

  private openConfirmDialog(
    sectionName: string,
    options: any[]
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmModalWithOptionComponent, {
      width: "33rem",
      height: "21rem",
      data: { sectionName, options },
      disableClose: true,
    });
    dialogRef.backdropClick().subscribe(() => dialogRef.close("cancel"));
    return dialogRef.afterClosed();
  }

  confirmDialog(
    sectionName: string,
    options: any[],
    onSuccess: Function,
    onFailure?: Function
  ) {
    this.openConfirmDialog(sectionName, options).subscribe(result => {
      if (result === true) {
        onSuccess();
      } else if (result === false) {
        onFailure();
      }
    });
  }
}
