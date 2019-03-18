import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-step-type",
  templateUrl: "./step-type.component.html",
  styleUrls: ["./step-type.component.scss"],
})
export class StepTypeComponent implements OnInit {
  @Input("sectionId") sectionId: number;
  @Input("stepIndex") stepIndex: number;
  @Input("stepData") stepData: any;
  @Input("sectionIndex") sectionIndex: number;
  @Output("deleteStep") deleteStep = new EventEmitter();
  @Output("outputChange") outputChange = new EventEmitter();
  canEdit: boolean = true;
  data = {
    field: "",
    value: "",
    notes: "",
    exception_handling: "",
    screen: "",
    stepNumber: "",
  };

  constructor() {}

  ngOnInit() {
    this.data.stepNumber = this.sectionIndex + 1 + "." + (this.stepIndex + 1);
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
        stepType: "type",
        sectionId: this.sectionId,
        stepId: this.stepData.step_id,
        mode: "edit",
      });
    } else {
      this.outputChange.emit({
        data: this.data,
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        stepType: "type",
        sectionId: this.sectionId,
        mode: "create",
      });
    }
  }

  onCancelEdit() {
    this.canEdit = false;
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
