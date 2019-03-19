import { Component } from "@angular/core";
import { StepBaseComponent } from "../step-base/step-base.component";

@Component({
  selector: "app-step-end-loop",
  templateUrl: "./step-end-loop.component.html",
  styleUrls: ["./step-end-loop.component.scss"],
})
export class StepEndLoopComponent extends StepBaseComponent {
  stepType = "end-loop";
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
