import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Screen } from "../../models/Screen.model";

@Injectable({
  providedIn: "root",
})
export class ExportToSopService {
  private screenList: Screen[] = [];

  constructor() {}

  appendScreen(data: Screen) {
    this.screenList.push(data);
  }

  updateScreen(index: number, data: Screen) {
    this.screenList[index] = data;
  }

  deleteScreen(index: number) {
    this.screenList.splice(index, 1);
  }

  insertScreen(index: number, data: Screen) {
    this.screenList.splice(index, 0, data);
  }

  getScreens() {
    return this.screenList;
  }

  storeScreens(screenList: Screen[]) {
    this.screenList = screenList;
  }

  isScreenListEmpty(): boolean {
    if (this.screenList.length > 0) {
      return false;
    }
    return true;
  }

  getScreensAsObservable(): Observable<Screen[]> {
    return new BehaviorSubject(this.screenList);
  }
}
