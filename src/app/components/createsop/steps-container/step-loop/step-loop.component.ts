import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-loop',
  templateUrl: './step-loop.component.html',
  styleUrls: ['./step-loop.component.scss']
})
export class StepLoopComponent implements OnInit {
  @Input('sectionId') sectionId:number;
  @Input('stepIndex') stepIndex:number;
  openDialogBox:boolean = false;
  rippleColor = 'rbga(0,0,0,0.2)';

  constructor() { }

  ngOnInit() {
  }

  onOpenDialogBox(){
    this.openDialogBox = !this.openDialogBox;
  }

}
