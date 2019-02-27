import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-steps-container',
  templateUrl: './steps-container.component.html',
  styleUrls: ['./steps-container.component.scss']
})
export class StepsContainerComponent implements OnInit {
  @Input('stepType') stepType:string = 'Read';
  @Input('stepIndex') stepIndex:number;

  constructor() { }

  ngOnInit() {
  }

}
