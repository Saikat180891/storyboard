import { EventEmitter, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppcontrolService {
  private overlayStatus: boolean = false;
  currentState;
  private editCard = [];

  lastNumber: number = 0;
  ID: number = 0;

  reloadSatus = true;

  data = new EventEmitter<any>();

  constructor() {}

  /**
   * Open/close backdrop
   * @param status
   */
  setOverlay(status) {
    this.overlayStatus = status;
  }

  /**
   * Check if backdrop is open or not
   */
  getOverlay() {
    return this.overlayStatus;
  }

  /**
   * Write dialog box header
   * @param value
   */
  overlayHeaderAssigner(value) {
    this.currentState = value;
  }

  getOverlayHeader() {
    return this.currentState;
  }

  setCardEdit(cardToEdit) {
    this.editCard[0] = cardToEdit;
  }

  getCardEditValues() {
    return this.editCard;
  }

  getUniqueNumber() {
    this.lastNumber += 1;
    if (this.lastNumber == 5) {
      this.lastNumber = 0;
    }
    return this.lastNumber;
  }

  getID() {
    this.ID += 1;
    return this.ID;
  }

  firstZero(value) {
    const temp = value.toString().split("");
    if (temp.length > 1) {
      return value;
    }
    return 0 + "" + value;
  }
}
