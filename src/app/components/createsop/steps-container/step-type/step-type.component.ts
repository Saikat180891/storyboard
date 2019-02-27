import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-type',
  templateUrl: './step-type.component.html',
  styleUrls: ['./step-type.component.scss']
})
export class StepTypeComponent implements OnInit {
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
