import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CalculationStepData } from "../../common-model/step-type.model";
import { StepBaseComponent } from "../step-base/step-base.component";

@Component({
  selector: "app-step-calculation",
  templateUrl: "./step-calculation.component.html",
  styleUrls: ["./step-calculation.component.scss"],
})
export class StepCalculationComponent extends StepBaseComponent {
  stepType = "calculation";

  canEdit: boolean = true;

  data: CalculationStepData = {
    calc_value: "",
    screen: "",
  };
}
