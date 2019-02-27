import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-read',
  templateUrl: './step-read.component.html',
  styleUrls: ['./step-read.component.scss']
})
export class StepReadComponent implements OnInit {
  @Input('stepIndex') stepIndex:number;
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
  }

  onClikedOnEdit(){
    this.canEdit = !this.canEdit;
  }

  onClickOnOk(){
    this.canEdit = false;
    console.log(this.data)
  }

}
