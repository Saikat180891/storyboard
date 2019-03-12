import { Component, OnInit } from '@angular/core';
import { StepcontrolService } from '../services/stepcontrol/stepcontrol.service';
import { DataService } from '../../../data.service';
import { PageService } from '../services/page/page.service';
import { SectionListItem } from '../common-model/section-list-item.model';
import { Observable } from 'rxjs';

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

  onButtonDragged($event: any, index: number) {
    if ($event.data === 'Section' && index < this.__steps.getListLength() - 1){
      this.__steps.insertSectionAt(index);
    } else {
      this.__steps.insertStep($event.index, $event.data);
    }
  }

  onCreateNewSection(){
    this.__steps.appendSection();
  }

  onDeleteStep($event){
    this.__steps.deleteStep($event.sectionIndex, $event.stepIndex);
  }

  getListOfCreatedSectionFromServer(): Observable<SectionListItem[]>{
    const endpoint = `/sop/epics/userstories/${this.__page.userStoryId}/sections.json`;
    return this.__api.get(endpoint);
  }

  onOutputChange($event){
    // const endpoint = `/sop/epics/userstories/${this.__page.userStoryId}/sections.json`;
    // let payload = {
    //   prev_insertion_id: this.sectionList[$event.sectionIndex].steps[$event.stepIndex - 1].id,
    //   next_insertion_id: this.sectionList[$event.sectionIndex].steps[$event.stepIndex + 1].id,
    //   section_insertion_id: $event.sectionId,
    //   step_group_insertion_id: '',
    //   propagate: '',
    //   type: $event.stepType,
    //   data: $event.data
    // }
    // this.__api.post(endpoint, payload).subscribe(res=>{

    // });
    console.log($event)
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
