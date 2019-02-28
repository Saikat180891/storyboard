import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-read',
  templateUrl: './step-read.component.html',
  styleUrls: ['./step-read.component.scss']
})
export class StepReadComponent implements OnInit {
  @Input('sectionId') sectionId:number;
  @Input('stepIndex') stepIndex:number;
  @Input('sectionIndex') sectionIndex:number;
  @Output('deleteStep') deleteStep = new EventEmitter();
  @Output('outputChange') outputChange = new EventEmitter();
  canEdit:boolean = true;
  data = {
    field:'',
    value:'',
    dataType:'',
    dataValueConstraint:'',
    notes:'',
    exceptionHandling:'',
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
    this.outputChange.emit({data:this.data, sectionIndex:this.sectionIndex, stepIndex:this.stepIndex, stepType: 'Read', sectionId: this.sectionId});
  }

  onCancelEdit(){
    this.canEdit = false;
  }

  onDeleteStep(){
    this.deleteStep.emit({sectionIndex:this.sectionIndex, stepIndex:this.stepIndex});
  }

}
