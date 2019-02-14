import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-read',
  templateUrl: './step-read.component.html',
  styleUrls: ['./step-read.component.scss']
})
export class StepReadComponent implements OnInit {
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
