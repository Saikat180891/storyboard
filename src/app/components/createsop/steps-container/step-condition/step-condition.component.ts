import { Component } from "@angular/core";
import {
  ConditionStepData,
  StepConditionType,
} from "../../common-model/step-type.model";
import { StepBaseComponent } from "../step-base/step-base.component";

@Component({
  selector: "app-step-condition",
  templateUrl: "./step-condition.component.html",
  styleUrls: ["./step-condition.component.scss"],
})
export class StepConditionComponent extends StepBaseComponent {
  stepType = "condition";
  data: ConditionStepData = {
    condition_selected: StepConditionType.MINOR,
    first_variable: "",
    logic: "",
    last_variable: "",
    majors: [{}],
    screen: "",
  };

  onAddAnotherRow() {
    this.data.majors.push({});
  }

  onDeleteNewRow(index: number) {
    this.data.majors.splice(index, 1);
  }
}
