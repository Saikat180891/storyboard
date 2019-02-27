import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-step-ui-interaction',
  templateUrl: './step-ui-interaction.component.html',
  styleUrls: ['./step-ui-interaction.component.scss']
})
export class StepUiInteractionComponent implements OnInit {
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
