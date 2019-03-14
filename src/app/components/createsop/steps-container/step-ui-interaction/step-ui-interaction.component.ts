import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-ui-interaction',
  templateUrl: './step-ui-interaction.component.html',
  styleUrls: ['./step-ui-interaction.component.scss']
})
export class StepUiInteractionComponent implements OnInit {
  @Input('sectionId') sectionId:number;
  @Input('stepIndex') stepIndex:number;
  @Input('stepData') stepData: any;
  @Input('sectionIndex') sectionIndex:number;
  @Output('deleteStep') deleteStep = new EventEmitter();
  @Output('outputChange') outputChange = new EventEmitter();
  canEdit:boolean = true;
  data = {
    interaction_type:'',
    click_option:'',
    field:'',
    notes:'',
    exception_handling:'',
    screen:'',
    step_number:''
  }

  constructor() { }

  ngOnInit() {
    this.data.step_number = (this.sectionIndex + 1) + "." + (this.stepIndex + 1);
    if ( this.stepData.step_id || this.stepData.id) {
      this.data = {
        ...this.stepData.data
      };
      this.canEdit = false;
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
        stepType: 'ui-interaction',
        sectionId: this.sectionId,
        stepId: this.stepData.step_id,
        mode: 'edit'
      });
    } else {
      this.outputChange.emit({
        data: this.data,
        sectionIndex: this.sectionIndex,
        stepIndex: this.stepIndex,
        stepType: 'ui-interaction',
        sectionId: this.sectionId,
        mode: 'create'
      });
    }
  }

  onCancelEdit() {
    this.canEdit = false;
  }

  onDeleteStep() {
    this.deleteStep.emit({sectionIndex:this.sectionIndex, stepIndex:this.stepIndex});
  }

}
