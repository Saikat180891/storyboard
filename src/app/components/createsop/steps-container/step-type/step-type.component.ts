import { Component } from "@angular/core";
import { TypeStepData } from "../../common-model/step-type.model";
import { StepBaseComponent } from "../step-base/step-base.component";

@Component({
  selector: "app-step-type",
  templateUrl: "./step-type.component.html",
  styleUrls: ["./step-type.component.scss"],
})
export class StepTypeComponent extends StepBaseComponent {
  stepType = "type";

  data: TypeStepData = {
    field: "",
    value: "",
    notes: "",
    exception_handling: "",
    screen: "",
  };
}
