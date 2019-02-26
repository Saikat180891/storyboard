import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-calculation',
  templateUrl: './step-calculation.component.html',
  styleUrls: ['./step-calculation.component.scss']
})
export class StepCalculationComponent implements OnInit {
  @Input('stepIndex') stepIndex:number;
  canEdit:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onClikedOnEdit(){
    this.canEdit = false;
  }

  onClickOnOk(){
    this.canEdit = true;
  }

}
