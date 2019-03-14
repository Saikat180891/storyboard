import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-calculation',
  templateUrl: './step-calculation.component.html',
  styleUrls: ['./step-calculation.component.scss']
})
export class StepCalculationComponent implements OnInit {
  @Input('sectionId') sectionId:number;
  @Input('stepIndex') stepIndex:number;
  @Input('sectionIndex') sectionIndex:number;
  @Output('deleteStep') deleteStep = new EventEmitter();
  @Output('outputChange') outputChange = new EventEmitter();
  canEdit:boolean = true;
  data = {
    calc_value:'',
    screen:'',
    stepNumber:''
  }

  constructor() { }

  ngOnInit() {
    this.data.stepNumber = (this.sectionIndex + 1) + "." + (this.stepIndex + 1);
  }

  onClikedOnEdit(){
    this.canEdit = !this.canEdit;
  }

  onClickOnOk(){
    this.canEdit = false;
    this.outputChange.emit({data:this.data, sectionIndex:this.sectionIndex, stepIndex:this.stepIndex, stepType: 'calculation', sectionId: this.sectionId});
  }

  onCancelEdit(){
    this.canEdit = false;
  }

  onDeleteStep(){
    this.deleteStep.emit({sectionIndex:this.sectionIndex, stepIndex:this.stepIndex});
  }

}
