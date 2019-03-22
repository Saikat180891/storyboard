import { Component } from "@angular/core";
import { StepBaseComponent } from "../step-base/step-base.component";

@Component({
  selector: "app-step-condition",
  templateUrl: "./step-condition.component.html",
  styleUrls: ["./step-condition.component.scss"],
})
export class StepConditionComponent extends StepBaseComponent {
  stepType = "condition";
  canEdit: boolean = false;
  addAnotherRow: any = [1];
  conditions = ["Major", "Minor"];
  conditionSelection = "Major";
  data = {
    interaction_type: "",
    click_option: "",
    field: "",
    notes: "",
    exception_handling: "",
    screen: "",
  };

  variableOptions = ["Option 1", "Option 2", "Option 3"];

  ngOnInit() {
    if (this.stepData.step_id || this.stepData.id) {
      this.data = {
        ...this.stepData.data,
      };
      this.canEdit = false;
    }
  }

  onClikedOnEdit() {
    this.canEdit = false;
  }

  onClickOnOk() {
    this.canEdit = true;
  }

  onAddAnotherRow() {
    this.addAnotherRow.push(1);
  }

  onDeleteNewRow(index: number) {
    this.addAnotherRow.splice(index, 1);
  }

  onChangeSelection($event) {}
}
