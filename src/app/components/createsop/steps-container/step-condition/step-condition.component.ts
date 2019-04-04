import { Component } from "@angular/core";
import { StepBaseComponent } from "../step-base/step-base.component";

@Component({
  selector: "app-step-condition",
  templateUrl: "./step-condition.component.html",
  styleUrls: ["./step-condition.component.scss"],
})
export class StepConditionComponent extends StepBaseComponent {
  stepType = "condition";
  data = {
    conditionSelected: "Minor",
    firstVariable: "",
    logic: "",
    lastVariable: "",
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
