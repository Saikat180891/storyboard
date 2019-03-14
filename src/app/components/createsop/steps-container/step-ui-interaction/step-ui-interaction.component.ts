import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-ui-interaction',
  templateUrl: './step-ui-interaction.component.html',
  styleUrls: ['./step-ui-interaction.component.scss']
})
export class StepUiInteractionComponent implements OnInit {
  @Input('sectionId') sectionId:number;
  @Input('stepIndex') stepIndex:number;
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
    stepNumber:''
  }

  constructor() { }

  ngOnInit() {
    this.data.stepNumber = (this.sectionIndex + 1) + "." + (this.stepIndex + 1);
    console.log(this.stepIndex, this.sectionIndex)
  }

  onClikedOnEdit(){
    this.canEdit = !this.canEdit;
  }

  onClickOnOk(){
    this.canEdit = false;
    console.log(this.data);
    // this.outputChange.emit({data:this.data, sectionIndex:this.sectionIndex, stepIndex:this.stepIndex, stepType: 'ui_interaction', sectionId: this.sectionId});
  }

  onCancelEdit(){
    this.canEdit = false;
  }

  onDeleteStep(){
    this.deleteStep.emit({sectionIndex:this.sectionIndex, stepIndex:this.stepIndex});
  }

}
