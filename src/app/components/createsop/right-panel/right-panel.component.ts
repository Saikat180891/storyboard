import { Component, OnInit } from '@angular/core';
import { StepcontrolService } from '../services/stepcontrol/stepcontrol.service';
import { DataService } from '../../../data.service';
import { PageService } from '../services/page/page.service';
import { SectionListItem } from '../common-model/section-list-item.model';

interface StepTypeDropEvent {
  data: string;
  index: number;
}
@Component({
  selector: 'right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {
  /**
   * 'sectionList' is the main array and it has collection of objects
   */
  sectionList: SectionListItem[] = [];

  constructor(
    private __steps:StepcontrolService,
    private __api:DataService,
    private __page:PageService) {
   }

   /**
    * get the section list and render it in the browser
    */
  ngOnInit() {
    this.sectionList = this.__steps.getList();
  }

  /**
   * this function is triggered when the user drops a button at the dropable area
   * an event called 'sectionPayload' is triggered and which contains a payload
   * generated from the child component called section-title.component.ts
   * -$event is an object and contains the following:-
   * -- data  -> it contains the type of button/step that is dragged over the droppable area,
   * so every button/step that is dragged has a data attribute emdedded in it which contains
   * the value of the button ex: 'Read', 'Type' etc.
   * -- index -> it is the section index where the button is dropped
   * @param $event
   * @param index it is the section index i.e. the position of that section in the
   * 'sopStepsList' array present in the stepcontrol.service.ts file
   */
  onButtonDragged($event: StepTypeDropEvent, index: number) {
    this.__steps.insertStep($event.index, $event.data);
  }

  onCreateNewSection(){
    this.__steps.appendSection();
  }

  onDeleteStep($event){
    this.__steps.deleteStep($event.sectionIndex, $event.stepIndex);
  }

  onOutputChange($event){
    const endpoint = `/sop/epics/userstories/${this.__page.userStoryId}/sections/${$event.sectionId}.json`;
    const payload = {
      prev_insertion_id: this.__steps.getPreviousInsertionIdOfStepInSection($event.sectionIndex, $event.stepIndex),
      next_insertion_id: this.__steps.getNextInsertionIdOfStepInSection($event.sectionIndex, $event.stepIndex),
      section_insertion_id: $event.sectionId,
      step_group_insertion_id: '',
      propagate: '',
      type: $event.stepType,
      data: $event.data
    };
    this.__api.post(endpoint, payload).subscribe(res => {
      this.__steps.updateStepWithResponse($event.sectionIndex, $event.stepIndex, res);
    });
  }

  /**
   * to create a section
   * @param $event contains the section name and section index in frontend
   */
  onSectionChange($event: Event) {
    // the required endpoint for creating section
    const endpoint = `/sop/epics/userstories/${this.__page.userStoryId}/sections/create.json`;
    const payload = {
      section_name: $event['sectionName'],
      prev_insertion_id: this.__steps.getPreviousInsertionIdOfSection($event['sectionIndex']),
      next_insertion_id: this.__steps.getNextInsertionIdOfSection($event['sectionIndex']),
      description: null
    };
    // make the call with the payload and body
    this.__api.post(endpoint, payload).subscribe(res => {
      this.__steps.updateSection(res, $event['sectionIndex']);
    });
    console.log($event, this.__steps.getList(), payload);
  }
}
