import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-calculation',
  templateUrl: './step-calculation.component.html',
  styleUrls: ['./step-calculation.component.scss']
})
export class StepCalculationComponent implements OnInit {
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
