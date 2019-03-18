import { EventEmitter, Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CardService {
  cardContent;

  sopId: number;

  constructor() {}
}
