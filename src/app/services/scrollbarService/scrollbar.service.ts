import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class ScrollbarService {
  private scrollbarPosition = new BehaviorSubject<number>(0);

  broadCastScrollPosition = this.scrollbarPosition.asObservable();

  constructor() {}

  setScrollPosition(position: number) {
    this.scrollbarPosition.next(position);
  }
}
