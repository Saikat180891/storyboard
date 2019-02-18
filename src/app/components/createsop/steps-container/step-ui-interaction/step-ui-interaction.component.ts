import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-ui-interaction',
  templateUrl: './step-ui-interaction.component.html',
  styleUrls: ['./step-ui-interaction.component.scss']
})
export class StepUiInteractionComponent implements OnInit {
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
