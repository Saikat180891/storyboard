import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { ConfirmModalComponent } from "./confirm-modal.component";
@Injectable({
  providedIn: "root",
})
export class ConfirmModalService {
  constructor(private dialog: MatDialog) {}

  private openDeleteDialog(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: "30rem",
      height: "15rem",
      data: { message },
    });
    return dialogRef.afterClosed();
  }

  //added a new callback method
  confirmDelete(message: string, onSuccess: Function, onFailure?: Function) {
    this.openDeleteDialog(message).subscribe(result => {
      if (result) {
        onSuccess();
      } else {
        onFailure();
      }
    });
  }
}
