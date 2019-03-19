import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { StepCommonHelperService } from "../step-common-helper.service";

@Component({
  selector: "app-step-condition",
  templateUrl: "./step-condition.component.html",
  styleUrls: ["./step-condition.component.scss"],
})
export class StepConditionComponent implements OnInit {
  @Input("sectionId") sectionId: number;
  @Input("stepIndex") stepIndex: number;
  @Input("stepData") stepData: any;
  @Input("sectionIndex") sectionIndex: number;
  @Output("deleteStep") deleteStep = new EventEmitter();
  @Output("outputChange") outputChange = new EventEmitter();

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
    step_number: "",
  };

  variableOptions = ["Option 1", "Option 2", "Option 3"];

  constructor(private __helper: StepCommonHelperService) {}

  ngOnInit() {
    this.data.step_number = this.sectionIndex + 1 + "." + (this.stepIndex + 1);
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

  getStepNumber() {
    return this.__helper.getStepNumber(this.sectionIndex, this.stepIndex);
  }

  onDeleteStep() {
    if (this.stepData.step_id || this.stepData.id) {
      this.deleteStep.emit({
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        stepId: this.stepData.step_id
          ? this.stepData.step_id
          : this.stepData.id,
        insertionId: this.stepData.insertion_id,
        mode: "server",
      });
    } else {
      this.deleteStep.emit({
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        mode: "local",
      });
    }
  }
}
