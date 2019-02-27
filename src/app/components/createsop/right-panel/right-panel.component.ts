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
    if($event.data === 'Section' && index < this.__steps.getListLength() - 1){
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
    const endpoint = `/sop/epics/userstories/${this.__page.userStoryId}/sections/${$event.sectionId}/stepgroups/${'step group id'}.json`;
    let payload = {
      prev_insertion_id: '',
      next_insertion_id: '',
      section_insertion_id: $event.sectionId,
      step_group_insertion_id: '',
      propagate: '',
      type: $event.stepType,
      data: $event.data
    }
    this.__api.post(endpoint, payload).subscribe(res=>{
      
    });
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
    this.__api.post(endpoint, payload).subscribe(res=>{
      this.__steps.editSectionDetailsWithResponse(res, $event.sectionIndex);
    });
    console.log($event);
  }
}
