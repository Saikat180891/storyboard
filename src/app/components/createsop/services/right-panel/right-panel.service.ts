import { ElementRef, Injectable } from "@angular/core";
import { BehaviorSubject, fromEvent, Observable } from "rxjs";
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

interface HighlightStep {
  screenId: number;
  stepId: number;
}

@Injectable({
  providedIn: "root",
})
export class RightPanelService {
  private scrollbarPosition = new BehaviorSubject<number>(0);
  private stepId = new BehaviorSubject<HighlightStep>({
    screenId: null,
    stepId: null,
  });

  constructor(private __api: DataService) {}

  infiniteScrollHandler(element: ElementRef): Observable<any> {
    return fromEvent(element.nativeElement, "scroll");
  }

  setScrollPosition(position: number) {
    this.scrollbarPosition.next(position);
  }

  getScrollPosition(): Observable<number> {
    return this.scrollbarPosition;
  }

  setHighlighter(stepId: HighlightStep) {
    this.stepId.next(stepId);
  }

  getHighlighterStepId(): Observable<HighlightStep> {
    return this.stepId;
  }

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

  /**
   * to delete a section
   * @param userStoryId
   * @param sectionId
   * @param insertionId
   */
  deleteSection(
    userStoryId: number,
    sectionId: number,
    insertionId: number
  ): Observable<any> {
    const endpoint = `/sop/epics/userstories/${userStoryId}/sections/destroy/${sectionId}.json?action=${"delete_all"}&insertion_id=${insertionId}`;
    return this.__api.deleteValue(endpoint);
  }

  /**
   * to update a section
   * @param sectionId
   * @param payload
   */
  updateSection(sectionId: number, payload: EditSectionName): Observable<any> {
    const endpoint = `/sop/epics/userstories/sections/${sectionId}.json`;
    return this.__api.updatePost(endpoint, payload);
  }

  /**
   * to create a section
   * @param userStoryId
   * @param payload
   */
  createSection(
    userStoryId: number,
    payload: CreateSection
  ): Observable<SectionListItem> {
    const endpoint = `/sop/epics/userstories/${userStoryId}/sections/create.json`;
    return this.__api.post(endpoint, payload);
  }

  /**
   * to create a step
   * @param userStoryId
   * @param sectionId
   * @param payload
   */
  createStep(
    userStoryId: number,
    sectionId: number,
    payload: any
  ): Observable<any> {
    const endpoint = `/sop/epics/userstories/${userStoryId}/sections/${sectionId}.json`;
    return this.__api.post(endpoint, payload);
  }

  /**
   * to update a step
   * @param stepId
   * @param payload
   */
  updateStep(stepId: number, payload: any): Observable<any> {
    const endpoint = `/sop/epics/userstories/sections/steps/${stepId}.json`;
    return this.__api.updatePost(endpoint, payload);
  }

  moveStep(
    userStory: number,
    stepId: number,
    prevStepId: number,
    nextStepId: number
  ) {
    const endpoint = `/sop/epics/userstories/${userStory}/sections/steps/move/${stepId}/?move=intra_section`;
    return this.__api.updatePost(endpoint, {
      prev_step_id: prevStepId,
      next_step_id: nextStepId,
    });
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

  downloadAttachment($event): Observable<any> {
    return this.__api.downloadFile($event);
  }
}
