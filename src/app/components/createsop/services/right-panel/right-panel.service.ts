import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DataService } from "../../../../data.service";
import { SectionListItem } from "../../common-model/section-list-item.model";

interface EditSectionName {
  section_name: string;
  section_id: number;
  description: string;
}

interface CreateSection {
  section_name: string;
  prev_insertion_id: number | null | string;
  next_insertion_id: number | null | string;
  description: string;
}

@Injectable({
  providedIn: "root",
})
export class RightPanelService {
  constructor(private __api: DataService) {}

  /**
   * this function is used to get all the previouslycreated function in the
   * db and it returns an Observable which is subscribed in the ngOnInit()
   */
  getListOfCreatedSectionFromServer(
    userStoryId: number
  ): Observable<SectionListItem[]> {
    const endpoint = `/sop/epics/userstories/${userStoryId}/sections.json`;
    return this.__api.get(endpoint).pipe(
      map(res => {
        return res.map(item => {
          return Object.assign({}, item);
        });
      })
    );
  }

  deleteSection(
    userStoryId: number,
    sectionId: number,
    insertionId: number
  ): Observable<any> {
    const endpoint = `/sop/epics/userstories/${userStoryId}/sections/destroy/${sectionId}.json?insertion_id=${insertionId}`;
    return this.__api.deleteValue(endpoint);
  }

  updateSection(sectionId: number, payload: EditSectionName): Observable<any> {
    const endpoint = `/sop/epics/userstories/sections/${sectionId}.json`;
    return this.__api.updatePost(endpoint, payload);
  }

  createSection(
    userStoryId: number,
    payload: CreateSection
  ): Observable<SectionListItem> {
    const endpoint = `/sop/epics/userstories/${userStoryId}/sections/create.json`;
    return this.__api.post(endpoint, payload);
  }

  createStep(
    userStoryId: number,
    sectionId: number,
    payload: any
  ): Observable<any> {
    const endpoint = `/sop/epics/userstories/${userStoryId}/sections/${sectionId}.json`;
    return this.__api.post(endpoint, payload);
  }

  updateStep(stepId: number, payload: any): Observable<any> {
    const endpoint = `/sop/epics/userstories/sections/steps/${stepId}.json`;
    return this.__api.updatePost(endpoint, payload);
  }

  deleteStep(
    userStoryId: number,
    stepNumber: number,
    insertionId: number,
    sectionInsertionId: number
  ): Observable<any> {
    const endpoint = `/sop/epics/userstories/${userStoryId}/sections/steps/destroy/${stepNumber}.json?insertion_id=${insertionId}&&section_insertion_id=${sectionInsertionId}&&propagate=${true}`;
    return this.__api.deleteValue(endpoint);
  }
}
