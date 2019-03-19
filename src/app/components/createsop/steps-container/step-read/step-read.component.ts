import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { StepCommonHelperService } from "../step-common-helper.service";
@Component({
  selector: "app-step-read",
  templateUrl: "./step-read.component.html",
  styleUrls: ["./step-read.component.scss"],
})
export class StepReadComponent implements OnInit {
  @Input("sectionId") sectionId: number;
  @Input("stepIndex") stepIndex: number;
  @Input("sectionIndex") sectionIndex: number;
  @Input("stepData") stepData: any;
  @Output("deleteStep") deleteStep = new EventEmitter();
  @Output("outputChange") outputChange = new EventEmitter();
  canEdit: boolean = true;
  data = {
    field: "",
    value: "",
    data_type: "",
    data_value_constraint: "",
    notes: "",
    exception_handling: "",
    screen: "",
    step_number: "",
  };

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
    this.canEdit = !this.canEdit;
  }

  onClickOnOk() {
    this.canEdit = false;
    if (this.stepData.step_id) {
      this.outputChange.emit({
        data: this.data,
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        stepType: "read",
        sectionId: this.sectionId,
        stepId: this.stepData.step_id,
        mode: "edit",
      });
    } else {
      this.outputChange.emit({
        data: this.data,
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        stepType: "read",
        sectionId: this.sectionId,
        mode: "create",
      });
    }
  }

  onCancelEdit() {
    this.canEdit = false;
  }

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
