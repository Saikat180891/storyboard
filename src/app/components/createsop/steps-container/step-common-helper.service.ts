import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StepCommonHelperService {
  constructor() {}

  getStepNumber(sectionIndex: number, stepIndex: number) {
    return `${sectionIndex + 1}.${stepIndex + 1}`;
  }
}
