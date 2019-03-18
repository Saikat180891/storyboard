import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SharedServicesService {
  KEY_CODE = {
    RIGHT_ARROW: 39,
    LEFT_ARROW: 37,
    ESCAPE: 27,
    ENTER: 13,
  };

  constructor() {}
}
