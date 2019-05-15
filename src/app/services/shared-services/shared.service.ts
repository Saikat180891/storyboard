import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: "root",
})
export class SharedService {
  KEY_CODE = {
    RIGHT_ARROW: 39,
    LEFT_ARROW: 37,
    ESCAPE: 27,
    ENTER: 13,
  };

  constructor(private snackBar: MatSnackBar) {}

  raiseError(err: any) {
    const errorMessage =
      err && err.error && err.error.detail ? err.error.detail : err;
    this.snackBar.open(errorMessage, "Error", {
      duration: 5000,
    });
  }
}
