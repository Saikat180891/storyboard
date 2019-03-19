import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DragDropService {
  listItem: any = new BehaviorSubject<any>(0);

  constructor() {}

  getEventLocation() {
    return this.listItem;
  }

  setEvent(value: any) {
    this.listItem.next(value);
  }
}
