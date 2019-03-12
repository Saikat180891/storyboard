import { Injectable } from '@angular/core';
import { SectionListItem } from '../../common-model/section-list-item.model';
import { StepType } from '../../common-model/step-type.model';
@Injectable({
  providedIn: 'root'
})
export class StepcontrolService {

  private sopSectionList: SectionListItem[] = [];
  private sectionIdList = [];

  constructor() { }

  /**
   * this function with insert a step at the end of an array
   * @param index i'th element in the 'sopSectionList' where the user wants to create a step
   * @param stepType this is a string which contains the type of step the user want to create
   */
  insertStep(index: number, stepType: string){
    const stepItem = {
      type: stepType.toLowerCase(),
      data : {}
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
  updateStepWithResponse(sectionIndex: number, stepIndex: number, data: StepType){
    this.sopSectionList[sectionIndex].steps_list[stepIndex] = {
      ...data
    };
  }

  /**
   * Creates a new section
   */
  appendSection() {
    const data = {
      section_name: null,
      steps_list: [],
      description: 'test'
    }
    this.sopSectionList.push(data);
  }

  setSectionList(sectionList: SectionListItem[]){
    this.sopSectionList = sectionList;
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
    for ( const key in responseData) {
      if (key === 'section_name') {
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
  editStepValues(responseData:any, sectionIndex:number, stepIndex:number){
    this.sopSectionList[sectionIndex].steps_list[stepIndex] = responseData;
  }

  insertSectionAt(indexAfter){
    let data = {
      sectionName: 'section name',
      steps:[]
    }
    // this.sopSectionList.splice(indexAfter, 0, data);
  }

  moveItem(newPosition, previousPosition, data){
    this.sopSectionList.splice(newPosition, 0, data);
  }

  removeSection(sectionIndex: number) {
    this.sopSectionList.splice(sectionIndex, 1);
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

  deleteSection(stepIndex: number){
    this.sopSectionList.splice(stepIndex, 1);
  }

  // moving steps inside section
  getPreviousInsertionIdOfStepInSection(sectionIndex: number, stepIndex: number) {
    // if the 'steps_list' array is empty then return null which indicates that this is the first step in the corresponding section
    if (this.sopSectionList[sectionIndex].steps_list.length === 1){
      return null;
    } else {
      // return the 'insertion_id' of the previous step in that corresponding section
      return +this.sopSectionList[sectionIndex].steps_list[stepIndex - 1]['insertion_id'];
    }
  }

  getNextInsertionIdOfStepInSection(sectionIndex: number, stepIndex: number) {
    if (this.sopSectionList[sectionIndex].steps_list.length === 1) {
      return null;
    }
    if (stepIndex === this.sopSectionList[sectionIndex].steps_list.length - 1) {
      return null;
    } else {
      return +this.sopSectionList[sectionIndex].steps_list[stepIndex + 1]['insertion_id'];
    }
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
    } else {
      // if the user is creating a section at the middle of the 'sopSectionList'
      // then return the 'prev_insertion_id' for the previous element
      return +this.sopSectionList[sectionIndex - 1]['insertion_id'];
    }
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
    } else {
      // if the user is creating a section at the middle of the 'sopSectionList' then return the 'next_insertion_id' for the next element
      return +this.sopSectionList[sectionIndex + 1]['insertion_id'];
    }
  }
}
