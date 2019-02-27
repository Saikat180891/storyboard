import { Component, OnInit } from '@angular/core';
import { StepcontrolService } from '../services/stepcontrol/stepcontrol.service';
import { DataService } from "../../../data.service";
import { PageService } from "../services/page/page.service";
@Component({
  selector: 'right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  stepList:any = [];

  constructor(
    private __steps:StepcontrolService,
    private __api:DataService,
    private __page:PageService) {
   }

  ngOnInit() {
    this.stepList = this.__steps.getList();
  }

  onButtonDragged($event:any, index:number){
    if($event.data === 'Section' && index == this.__steps.getListLength() - 1){
      this.__steps.appendSection();
    }else if($event.data === 'Section' && index < this.__steps.getListLength() - 1){
      this.__steps.insertSectionAt(index);
    }else{
      this.__steps.insertStep($event.index, $event.data);
    }
  }

  onCreateNewSection(){
    this.__steps.appendSection();
  }

  onDeleteStep($event){
    this.__steps.deleteStep($event.sectionIndex, $event.stepIndex);
  }

  onOutputChange($event){
    console.log($event)
  }

  onSectionChange($event){
    const endpoint = `/sop/epics/userstories/${this.__page.userStoryId}/sections/create.json`
    let payload = {
      section_name: $event.sectionName,
      prev_insertion_id: $event.sectionIndex === 0 ? '' : $event.sectionIndex - 1,
      next_insertion_id: '',
      description: 'testing'
    }
    console.log($event, $event.sectionIndex);
  }
}
