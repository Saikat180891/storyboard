import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StepLinkServiceService {
  private stepsInsideViewPort: number[] = [];
  constructor() {}

  private stepInViewport = {}

  addStepsInViewPort(stepId: number, screenId: number) {
    if (this.stepsInsideViewPort.indexOf(stepId) === -1) {
      this.stepsInsideViewPort.push(stepId);
    }
    if(!(stepId in this.stepInViewport)){
      this.stepInViewport[stepId] = {screenId, stepId};
    }
  }

  removeStepsNotInViewport(stepId: number) {
    if (this.stepsInsideViewPort.indexOf(stepId) !== -1) {
      this.stepsInsideViewPort.splice(this.stepsInsideViewPort.indexOf(stepId), 1);
    }

    if(stepId in this.stepInViewport){
      delete this.stepInViewport[stepId];
    }
  }

  getStepsInViewport() {
    return this.stepsInsideViewPort;
  }

  getFirstStepId(scrollDirection: string) {
    if (scrollDirection === "up") {
      return this.stepInViewport[this.stepsInsideViewPort[this.stepsInsideViewPort.length - 1]];
    }
    return this.stepInViewport[this.stepsInsideViewPort[0]];
  }

}
