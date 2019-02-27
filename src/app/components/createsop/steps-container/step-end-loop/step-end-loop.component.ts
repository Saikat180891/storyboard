import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-end-loop',
  templateUrl: './step-end-loop.component.html',
  styleUrls: ['./step-end-loop.component.scss']
})
export class StepEndLoopComponent implements OnInit {
  @Input('stepIndex') stepIndex:number;
  openDialogBox:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onOpenDialogBox(){
    this.openDialogBox = !this.openDialogBox;
  }

}
