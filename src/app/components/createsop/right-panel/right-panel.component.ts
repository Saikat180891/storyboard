import { Component, OnInit } from '@angular/core';
import {StepcontrolService} from '../services/stepcontrol/stepcontrol.service';

@Component({
  selector: 'right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  steps:any = [];

  constructor(private __steps:StepcontrolService) { }

  ngOnInit() {
    this.steps = this.__steps.sopStepsList;
  }

}
