import { Component, OnInit } from '@angular/core';
import { StepcontrolService } from '../services/stepcontrol/stepcontrol.service';
import { DataService } from '../../../data.service';
import { PageService } from '../services/page/page.service';
import { SectionListItem } from '../common-model/section-list-item.model';
import { Observable } from 'rxjs';

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
    // fetch all the previously created section when the component loads
    this.getListOfCreatedSectionFromServer().subscribe(res => {
      // store the response in the step control service
      this.__steps.setSectionList(res);
    },
    err => {
      // initiate the 'sectionList' with the step control service
      this.sectionList = this.__steps.getList();
    },
    () => {
      // initiate the 'sectionList' with the step control service
      this.sectionList = this.__steps.getList();
    });
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
    console.log(this.__steps.getList())
  }

  onDeleteStep($event) {
    this.__steps.deleteStep($event.sectionIndex, $event.stepIndex);
  }

  onDeleteSection($event: Event) {
    const endpoint = `/sop/epics/userstories/${this.__page.userStoryId}/sections/destroy/${$event['sectionId']}.json?insertion_id=${$event['insertionId']}`;
    this.__api.deleteValue(endpoint).subscribe(res => {
      this.__steps.deleteSection($event['sectionIndex']);
    });
  }

  getListOfCreatedSectionFromServer(): Observable<SectionListItem[]>{
    const endpoint = `/sop/epics/userstories/${this.__page.userStoryId}/sections.json`;
    return this.__api.get(endpoint);
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
      section_name: $event['sectionName']['section_name'],
      prev_insertion_id: this.__steps.getPreviousInsertionIdOfSection($event['sectionIndex']),
      next_insertion_id: this.__steps.getNextInsertionIdOfSection($event['sectionIndex']),
      description: 'test'
    };
    // make the call with the payload and body
    this.__api.post(endpoint, payload).subscribe(res => {
      this.__steps.updateSection(res, $event['sectionIndex']);
    });
    console.log($event, this.__steps.getList(), payload);
  }
}
