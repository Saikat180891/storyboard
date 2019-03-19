import { Component } from "@angular/core";
import { StepBaseComponent } from "../step-base/step-base.component";

@Component({
  selector: "app-step-loop",
  templateUrl: "./step-loop.component.html",
  styleUrls: ["./step-loop.component.scss"],
})
export class StepLoopComponent extends StepBaseComponent {
  stepType = "start-loop";
  canEdit: boolean = true;
  displayDialogBox: boolean = true;
  data = {
    loop_params: "",
    screen: "",
  };

  onDisplayOptions() {
    this.displayDialogBox = !this.displayDialogBox;
  }
}
