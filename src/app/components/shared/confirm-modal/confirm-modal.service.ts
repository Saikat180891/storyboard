import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { ConfirmModalComponent } from "./confirm-modal.component";
@Injectable({
  providedIn: "root",
})
export class ConfirmModalService {
  constructor(private dialog: MatDialog) {}

  private openDialog(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: "30rem",
      height: "15rem",
      data: { message },
    });
    return dialogRef.afterClosed();
  }

  confirmDelete(message: string, callback: any) {
    this.openDialog(message).subscribe(result => {
      if (result) callback();
    });
  }
}
