import { Component, OnInit } from '@angular/core';
import {StepcontrolService} from '../services/stepcontrol/stepcontrol.service';

@Component({
  selector: 'right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  stepList:any = [];

  constructor(private __steps:StepcontrolService) { }

  ngOnInit() {
    this.stepList = this.__steps.getList();
  }

  onButtonDragged($event:any, index:number){
    if($event.data === 'Section' && index == this.__steps.getListLength() - 1){
      this.__steps.appendList(index);
    }else if($event.data === 'Section' && index < this.__steps.getListLength() - 1){
      this.__steps.insertInList(index);
    }else{
      this.__steps.insertItem($event.index, $event.data);
    }
    console.log(this.__steps.getList(), $event, index);
  }
}
