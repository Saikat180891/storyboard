import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class OperationBarService {
  isLoopButtonPresent = new BehaviorSubject<boolean>(true);
  toggleFlag: boolean = true;

  constructor() {}

  toggleLoop() {
    this.toggleFlag = !this.toggleFlag;
    this.isLoopButtonPresent.next(this.toggleFlag);
  }

  getLoopStatus(): Observable<boolean> {
    return this.isLoopButtonPresent;
  }
}
