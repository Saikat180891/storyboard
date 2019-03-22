import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { Injectable } from "@angular/core";
import { SectionListItem } from "../../common-model/section-list-item.model";
import { Step } from "../../common-model/step-type.model";
import { PageService } from "../page/page.service";
import { RightPanelService } from "../right-panel/right-panel.service";
@Injectable({
  providedIn: "root",
})
export class StepcontrolService {
  private sopSectionList: SectionListItem[] = [];
  private sectionIdList = [];

  constructor(
    private rightPanelService: RightPanelService,
    private pageService: PageService
  ) {}

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
  }
  /**
   * update the existing element in the steps_list of a particular
   * section with the response received from the backend
   * @param sectionIndex index of the section
   * @param stepIndex index of the step
   * @param data response received from the backend
   */
  updateStepWithResponse(sectionIndex: number, stepIndex: number, data: Step) {
    this.sopSectionList[sectionIndex].steps_list[stepIndex] = {
      ...data,
    };
  }

  modifyStepOnEdit(sectionIndex: number, stepIndex: number, data: Step) {
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

  setSectionList(sectionList: SectionListItem[]) {
    this.sopSectionList = sectionList;
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
    currentIndex: number
  ) {
    moveItemInArray(
      this.sopSectionList[sectionIndex].steps_list,
      previousIndex,
      currentIndex
    );
    const stepId = this.getStepId(sectionIndex, currentIndex);
    const stepBeforeId = this.getStepId(sectionIndex, currentIndex - 1);
    const stepAfterId = this.getStepId(sectionIndex, currentIndex + 1);
    this.rightPanelService
      .moveStep(this.pageService.userStoryId, stepId, stepBeforeId, stepAfterId)
      .subscribe();
  }

  /**
   * this function is used to modify section properties
   * @param responseData data received from backend will the over write the respected values of section
   * @param sectionIndex is required to find where to modify
   * NOTE: steps are not modified
   */
  setSectionItem(responseData: any, sectionIndex: number) {
    this.sopSectionList[sectionIndex] = responseData;
  }

  /**
   * update the section name or description
   * @param responseData
   * @param sectionIndex
   */
  updateSectionItem(responseData: any, sectionIndex: number) {
    const keys = ["section_name", "description"];
    for (const key in keys) {
      if (key in responseData) {
        this.sopSectionList[sectionIndex][key] = responseData[key];
      }
    }
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

  deleteStep(sectionIndex, stepIntex) {
    this.sopSectionList[sectionIndex].steps_list.splice(stepIntex, 1);
  }

  deleteSection(stepIndex: number) {
    this.sopSectionList.splice(stepIndex, 1);
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
}
