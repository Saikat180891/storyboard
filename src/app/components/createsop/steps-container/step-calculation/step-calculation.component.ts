import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { StepBaseComponent } from "../step-base/step-base.component";

@Component({
  selector: "app-step-calculation",
  templateUrl: "./step-calculation.component.html",
  styleUrls: ["./step-calculation.component.scss"],
})
export class StepCalculationComponent extends StepBaseComponent {
  stepType = "calculation";

  canEdit: boolean = true;

  data = {
    calc_value: "",
    screen: "",
    step_number: "",
  };
}
