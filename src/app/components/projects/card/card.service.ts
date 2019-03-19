import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CardService {
  cardContent;

  sopId: number;

  constructor() {}
}
