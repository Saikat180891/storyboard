import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-loop',
  templateUrl: './step-loop.component.html',
  styleUrls: ['./step-loop.component.scss']
})
export class StepLoopComponent implements OnInit {
  @Input('sectionId') sectionId:number;
  @Input('stepIndex') stepIndex:number;
  @Input('sectionIndex') sectionIndex:number;
  @Input('stepData') stepData: any;
  @Output('deleteStep') deleteStep = new EventEmitter();
  @Output('outputChange') outputChange = new EventEmitter();
  canEdit:boolean = true;
  displayDialogBox: boolean = true;
  data = {
    loop_params:'',
    screen:''
  }

  constructor() { }

  ngOnInit() {
    if ( this.stepData.step_id || this.stepData.id) {
      this.data = {
        ...this.stepData.data
      }
      this.canEdit = false;
      this.displayDialogBox = false;
    }
  }

  onClikedOnEdit() {
    this.canEdit = !this.canEdit;
  }

  onClickOnOk() {
    this.canEdit = false;
    if ( this.stepData.step_id ) {
      this.outputChange.emit({
        data: this.data,
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        stepType: 'start-loop',
        sectionId: this.sectionId,
        stepId: this.stepData.step_id,
        mode: 'edit'
      });
    } else {
      this.outputChange.emit({
        data: this.data,
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        stepType: 'start-loop',
        sectionId: this.sectionId,
        mode: 'create'
      });
    }
  }

  onCancelEdit(){
    this.canEdit = false;
  }

  onDisplayOptions() {
    this.displayDialogBox = !this.displayDialogBox;
  }

  onDeleteStep(){
    this.deleteStep.emit({sectionIndex:this.sectionIndex, stepIndex:this.stepIndex});
  }
}
