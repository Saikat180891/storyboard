import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { EventEmitter, Injectable, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { SectionListItem } from "../../common-model/section-list-item.model";
import { Step, StepType } from "../../common-model/step-type.model";
import { PageService } from "../page/page.service";
import { RightPanelService } from "../right-panel/right-panel.service";
@Injectable({
  providedIn: "root",
})
export class StepcontrolService {
  private sopSectionList: SectionListItem[] = [];
  private sectionIdList = [];

  private startLoopCount: number = 0;
  private endLoopCount: number = 0;
  public detectUnpairedStartLoop = new BehaviorSubject<boolean>(false);
  public stepEditMode = new BehaviorSubject<boolean>(true);

  private shouldChildrenBeSaved = new BehaviorSubject<boolean>(false);

  @Output("sectionChangeDetector") sectionChangeDetector = new EventEmitter<
    any
  >();

  constructor(
    private rightPanelService: RightPanelService,
    private pageService: PageService
  ) {}

  getStepEditMode() {
    return this.stepEditMode;
  }

  setStepEditMode(editMode: boolean) {
    this.stepEditMode.next(editMode);
  }

  updateUnpairedStartLoop() {
    this.detectUnpairedStartLoop.next(this.unpairedStartLoopExists());
  }

  /**
   * Returns a boolean indicating whether or not there is a start loop that does
   * not have a corresponding end loop
   */
  unpairedStartLoopExists(): boolean {
    return this.startLoopCount - this.endLoopCount > 0;
  }

  /**
   * Utility method for determining if a step is a start loop or end loop.
   * @param stepType - string
   */
  isStepLoop(stepType: string): boolean {
    return stepType === StepType.START_LOOP || stepType === StepType.END_LOOP;
  }

  /**
   * Increments the appropriate loop counter for the given step type by 1.
   * If the stepType is not a start loop or end loop, do nothing.
   * @param stepType - string
   */
  incrementLoopCounter(stepType: string) {
    if (!this.isStepLoop(stepType)) {
      return;
    }
    if (stepType === StepType.START_LOOP) {
      this.startLoopCount += 1;
    } else {
      this.endLoopCount += 1;
    }
    this.updateUnpairedStartLoop();
  }

  /**
   * Decrements the appropriate loop counter for the given step type by 1.
   * If the stepType is not a start loop or end loop, do nothing.
   * @param stepType - string
   */
  decrementLoopCounter(stepType: string) {
    if (!this.isStepLoop(stepType)) {
      return;
    }
    if (stepType === StepType.START_LOOP) {
      this.startLoopCount -= 1;
    } else {
      this.endLoopCount -= 1;
    }
    this.updateUnpairedStartLoop();
  }

  /**
   * Iterates over all sections and steps to determine the number of
   * start loop and end loop steps.
   */
  recalculateLoopCounters(): void {
    this.startLoopCount = 0;
    this.endLoopCount = 0;
    this.sopSectionList.forEach(section => {
      const stepsList = section.steps_list;
      if (!stepsList) {
        return;
      }
      const startLoops = stepsList.filter(
        step => step.type === StepType.START_LOOP
      ).length;
      this.startLoopCount += startLoops;
      const endLoops = stepsList.filter(step => step.type === StepType.END_LOOP)
        .length;
      this.endLoopCount += endLoops;
    });
    this.updateUnpairedStartLoop();
  }

  /**
   * this function with insert a step at the end of an array
   * @param index i'th element in the 'sopSectionList' where the user wants to create a step
   * @param stepType this is a string which contains the type of step the user want to create
   */
  insertStep(index: number, stepType: string) {
    const stepItem = {
      type: stepType.toLowerCase(),
      data: {},
    };
    this.sopSectionList[index].steps_list.push(stepItem);
    this.incrementLoopCounter(stepType);
  }

  /**
   * update the existing element in the steps_list of a particular
   * section with the response received from the backend
   * @param sectionIndex index of the section
   * @param stepIndex index of the step
   * @param data response received from the backend
   */
  updateStepWithResponse(
    sectionIndex: number,
    stepIndex: number,
    data,
    updateAll: boolean
  ) {
    if (updateAll) {
      this.sopSectionList[sectionIndex].steps_list[stepIndex] = {
        ...data,
      };
    } else {
      this.sopSectionList[sectionIndex] = data;
      this.sopSectionList[sectionIndex].section_link = false;
    }
    this.sectionChangeDetector.emit(true);
  }

  modifyStepOnEdit(sectionIndex: number, stepIndex: number, data, propagate) {
    if (propagate) {
      for (const key in data) {
        if (key === "screenID") {
          this.sopSectionList[sectionIndex].steps_list[stepIndex]["screen_id"] =
            data[key];
        } else if (
          key in this.sopSectionList[sectionIndex].steps_list[stepIndex]
        ) {
          this.sopSectionList[sectionIndex].steps_list[stepIndex][key] =
            data[key];
        }
      }
    } else {
      this.sopSectionList[sectionIndex] = data;
      this.sopSectionList[sectionIndex].section_link = false;
    }
  }

  /**
   * Creates a new section
   */
  appendSection() {
    const data = {
      section_name: null,
      steps_list: [],
      description: "test",
    };
    this.sopSectionList.push(data);
  }

  setSectionLinking() {
    this.sopSectionList.forEach(section => {
      if (section.copy_list && section.copy_list.length > 1) {
        section.section_link = true;
      } else {
        section.section_link = false;
      }
    });
  }

  getSectionChangeDetector() {
    return this.sectionChangeDetector;
  }

  setSectionList(sectionList: SectionListItem[]) {
    this.sopSectionList = sectionList;
    this.setSectionLinking();
    this.recalculateLoopCounters();
  }

  getSopSectionList() {
    return this.sopSectionList;
  }

  getStepId(sectionIndex: number, stepIndex: number) {
    const section = this.sopSectionList[sectionIndex];
    if (!section) {
      return null;
    }

    const step = section.steps_list[stepIndex];
    if (!step) {
      return null;
    }

    return step.step_id;
  }

  /**
   * move element inside section
   * @param sectionIndex
   * @param previousIndex
   * @param currentIndex
   */
  moveStepsInsideSection(
    sectionIndex: number,
    previousIndex: number,
    currentIndex: number,
    propagate: boolean
  ) {
    moveItemInArray(
      this.sopSectionList[sectionIndex].steps_list,
      previousIndex,
      currentIndex
    );
    const stepId = this.getStepId(sectionIndex, currentIndex);
    const stepBeforeId = this.getStepId(sectionIndex, currentIndex - 1);
    const stepAfterId = this.getStepId(sectionIndex, currentIndex + 1);
    const sectionInsertionId = this.sopSectionList[sectionIndex].insertion_id;
    this.rightPanelService
      .moveStep(
        this.pageService.userStoryId,
        stepId,
        stepBeforeId,
        stepAfterId,
        sectionInsertionId,
        propagate
      )
      .subscribe(res => {
        this.sopSectionList[sectionIndex].steps_list[
          currentIndex
        ].insertion_id = res["insertion_id"];
        const responseData: any = res;
        if (!propagate) {
          this.sopSectionList[sectionIndex] = responseData;
          this.sopSectionList[sectionIndex]["section_link"] = false;
        }
        this.sectionChangeDetector.emit(true);
      });
  }

  /**
   * this function is used to modify section properties
   * @param responseData data received from backend will the over write the respected values of section
   * @param sectionIndex is required to find where to modify
   * NOTE: steps are not modified
   */
  setSectionItem(responseData: any, sectionIndex: number) {
    this.sopSectionList[sectionIndex] = responseData;
    this.sectionChangeDetector.emit(true);
  }

  /**
   * update the section name or description
   * @param responseData
   * @param sectionIndex
   */
  updateSectionItem(
    responseData: any,
    sectionIndex: number,
    propagate: boolean
  ) {
    if (!propagate) {
      this.sopSectionList[sectionIndex] = responseData;
      this.sopSectionList[sectionIndex]["section_link"] = false;
    } else {
      const keys = ["section_id", "section_name", "description"];
      keys.forEach(value => {
        if (value in responseData) {
          this.sopSectionList[sectionIndex][value] = responseData[value];
        }
      });
    }
    this.sectionChangeDetector.emit(true);
  }

  /**
   * this function modifies the step value inside a particular section
   * @param responseData step data received from backend
   * @param sectionIndex frontend index of section
   * @param stepIndex frontend index of steps array
   */
  editStepValues(responseData: any, sectionIndex: number, stepIndex: number) {
    this.sopSectionList[sectionIndex].steps_list[stepIndex] = responseData;
  }

  getList() {
    return this.sopSectionList;
  }

  getListLength() {
    return this.sopSectionList.length;
  }

  deleteStep(sectionIndex, stepIndex, propagate: boolean, response) {
    const step = this.sopSectionList[sectionIndex].steps_list.splice(
      stepIndex,
      1
    )[0];

    // Update the section with new section instance from response if we want to delink
    if (!propagate) {
      this.sopSectionList[sectionIndex].section_link = false;
      this.sopSectionList[sectionIndex] = response;
    }

    this.decrementLoopCounter(step.type);
    // Refresh Link state on the steps page
    this.sectionChangeDetector.emit(true);
  }

  deleteSection(stepIndex: number) {
    this.sopSectionList.splice(stepIndex, 1);
    this.recalculateLoopCounters();
  }

  // moving steps inside section
  getPreviousInsertionIdOfStepInSection(
    sectionIndex: number,
    stepIndex: number
  ) {
    // if the 'steps_list' array is empty then return null which indicates that this is the first step in the corresponding section
    if (this.sopSectionList[sectionIndex].steps_list.length === 1) {
      return null;
    }
    // return the 'insertion_id' of the previous step in that corresponding section
    return this.sopSectionList[sectionIndex].steps_list[stepIndex - 1]
      .insertion_id;
  }

  getNextInsertionIdOfStepInSection(sectionIndex: number, stepIndex: number) {
    if (this.sopSectionList[sectionIndex].steps_list.length === 1) {
      return null;
    }
    if (stepIndex === this.sopSectionList[sectionIndex].steps_list.length - 1) {
      return null;
    }
    return this.sopSectionList[sectionIndex].steps_list[stepIndex + 1][
      "insertion_id"
    ];
  }

  // these functions are written keeping future scope in mind, these function enables
  // the user to move sections if they want, although currently moving section is not
  // implemented
  /**
   * this function returns the insertion_id of the previous section, if the section
   * is the first element of the array then the function returns null
   * @param sectionIndex index of the section where the user wants a section to create
   */
  getPreviousInsertionIdOfSection(sectionIndex: number) {
    // check if the array contains any element
    if (this.sopSectionList.length === 1) {
      return null;
    }
    // if the user is creating a section at the middle of the 'sopSectionList'
    // then return the 'prev_insertion_id' for the previous element
    return this.sopSectionList[sectionIndex - 1]["insertion_id"];
  }

  /**
   * this function returns the insertion_id of the next section, if the section that the user
   * want to create is at the end then the function returns null
   * @param sectionIndex index of the section where the user wants a section to create
   */
  getNextInsertionIdOfSection(sectionIndex: number) {
    // check if the array contains any element
    if (this.sopSectionList.length === 1) {
      // if no element is there then it is the first element
      return null;
    }
    // if the user is creating a section at the end of the 'sopSectionList' then return null
    if (sectionIndex === this.sopSectionList.length - 1) {
      return null;
    }
    // if the user is creating a section at the middle of the 'sopSectionList' then return the 'next_insertion_id' for the next element
    return this.sopSectionList[sectionIndex + 1]["insertion_id"];
  }

  setShouldChildrenBeSaved(value: boolean) {
    this.shouldChildrenBeSaved.next(value);
  }

  getShouldChildrenBeSaved() {
    return this.shouldChildrenBeSaved;
  }
}
