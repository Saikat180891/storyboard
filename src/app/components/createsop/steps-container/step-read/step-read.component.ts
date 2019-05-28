import { Component } from "@angular/core";
import { StepBaseComponent } from "../step-base/step-base.component";
@Component({
  selector: "app-step-read",
  templateUrl: "./step-read.component.html",
  styleUrls: ["./step-read.component.scss"],
})
export class StepReadComponent extends StepBaseComponent {
  stepType = "read";
  dataTypeOptions = ["Any", "Integer", "String", "Float"];

  data = {
    field: "",
    value: "",
    data_type: "",
    data_value_constraint: "",
    notes: "",
    exception_handling: "",
    screen: "",
  };
}
