import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class LeftPanelService {
  constructor() {}

  private currentCurrent = new BehaviorSubject<number>(-1);
  private currentActiveStepId = null;

  setCurrentActiveStepId(stepId) {
    this.currentActiveStepId = stepId;
  }

  getCurrentActiveStepId() {
    return this.currentActiveStepId;
  }

  setCurrentScreen(screenId: number) {
    this.currentCurrent.next(screenId);
  }

  getCurrentScreen(): Observable<number> {
    return this.currentCurrent;
  }
}
