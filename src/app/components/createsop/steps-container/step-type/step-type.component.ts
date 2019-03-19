import { Component } from "@angular/core";
import { StepBaseComponent } from "../step-base/step-base.component";

@Component({
  selector: "app-step-type",
  templateUrl: "./step-type.component.html",
  styleUrls: ["./step-type.component.scss"],
})
export class StepTypeComponent extends StepBaseComponent {
  stepType = "type";

  data = {
    field: "",
    value: "",
    notes: "",
    exception_handling: "",
    screen: "",
    step_number: "",
  };
}
