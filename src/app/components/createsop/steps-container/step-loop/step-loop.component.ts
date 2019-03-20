import { Component } from "@angular/core";
import { StepBaseComponent } from "../step-base/step-base.component";

@Component({
  selector: "app-step-loop",
  templateUrl: "./step-loop.component.html",
  styleUrls: ["./step-loop.component.scss"],
})
export class StepLoopComponent extends StepBaseComponent {
  stepType = "start-loop";
  canEdit: boolean = false;
  displayDialogBox: boolean = false;
  data = {
    loop_params: "",
    screen: "",
  };

  setNewStepState() {
    this.canEdit = true;
    this.displayDialogBox = true;
  }

  setExistingStepState() {
    this.data = {
      ...this.stepData.data,
    };
    this.canEdit = false;
    this.displayDialogBox = false;
  }

  onDisplayOptions() {
    this.displayDialogBox = !this.displayDialogBox;
  }
}
