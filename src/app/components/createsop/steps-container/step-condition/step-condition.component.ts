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
    condition: "",
    operator: "",
    criteria: "",
    condition_blocks: [],
    screen: "",
    next_no_of_steps: "",
    notes: "",
  };

  onAddAnotherRow() {
    this.data.condition_blocks.push({});
  }

  onDeleteNewRow(index: number) {
    this.data.condition_blocks.splice(index, 1);
  }

  onClickOnConditionOk() {
    if (this.data.condition_selected === "Major") {
      this.data.next_no_of_steps = "";
    }
    this.onClickOnOk();
  }
}
