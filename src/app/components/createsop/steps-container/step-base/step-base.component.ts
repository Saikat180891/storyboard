import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-step-base",
  template: "",
})
export class StepBaseComponent implements OnInit {
  @Input("sectionId") sectionId: number;
  @Input("stepIndex") stepIndex: number;
  @Input("stepData") stepData: any;
  @Input("sectionIndex") sectionIndex: number;
  @Output("deleteStep") deleteStep = new EventEmitter();
  @Output("outputChange") outputChange = new EventEmitter();

  stepType: string = "base";
  canEdit: boolean = true;

  data: any = {};

  constructor() {}

  ngOnInit() {
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
        stepType: this.stepType,
        sectionId: this.sectionId,
        stepId: this.stepData.step_id,
        mode: "edit",
      });
    } else {
      this.outputChange.emit({
        data: this.data,
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        stepType: this.stepType,
        sectionId: this.sectionId,
        mode: "create",
      });
    }
  }

  onCancelEdit() {
    this.canEdit = false;
  }

  getStepNumber() {
    return `${this.sectionIndex + 1}.${this.stepIndex + 1}`;
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
