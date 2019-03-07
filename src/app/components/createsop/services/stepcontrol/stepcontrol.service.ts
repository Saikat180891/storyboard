import { Injectable } from '@angular/core';

interface StepList{
  section_name: string;
  steps_list: any[];
  insertion_id?: number;
  description: string;
  user_story_id?: number;
  section_id?: number;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class StepcontrolService {

  sopStepsList: StepList[] = [];

  constructor() { }

  /**
   * 
   * @param index
   * @param data
   */
  insertStep(index, data){
    this.sopStepsList[index].steps_list.push(data);
  }

  /**
   * Creates a new section
   */
  appendSection(){
    let data = {
      section_name: '',
      steps_list: [],
      description: 'test',
      id: -1
    }
    this.sopStepsList.push(data);
  }

  /**
   * this function is used to modify section properties
   * @param responseData data received from backend will the over write the respected values of section
   * @param sectionIndex is required to find where to modify
   * NOTE: steps are not modified
   */
  updateSection(responseData: any, sectionIndex: number) {
    this.sopStepsList[sectionIndex] = responseData;
  }

  /**
   * this function modifies the step value inside a particular section
   * @param responseData step data received from backend
   * @param sectionIndex frontend index of section
   * @param stepIndex frontend index of steps array
   */
  editStepValues(responseData:any, sectionIndex:number, stepIndex:number){
    this.sopStepsList[sectionIndex].steps_list[stepIndex] = responseData;
  }

  insertSectionAt(indexAfter){
    let data = {
      sectionName: 'section name',
      steps:[]
    }
    // this.sopStepsList.splice(indexAfter, 0, data);
  }

  moveItem(newPosition, previousPosition, data){
    this.sopStepsList.splice(newPosition, 0, data);
  }

  removeSection(sectionIndex: number) {
    this.sopStepsList.splice(sectionIndex, 1);
  }

  getList() {
    return this.sopStepsList;
  }

  getListLength() {
    return this.sopStepsList.length;
  }

  deleteStep(sectionIndex, stepIntex) {
    this.sopStepsList[sectionIndex].steps_list.splice(stepIntex, 1);
  }

  getPreviousInsertionIdOfSection(sectionIndex: number) {
    // check if the array contains any element
    if (this.sopStepsList.length === 1) {
      return null;
    } else {
      // if the user is creating a section at the middle of the 'sopStepsList' then return the 'prev_insertion_id' for the previous element
      return +this.sopStepsList[sectionIndex - 1]['insertion_id'];
    }
  }

  getNextInsertionIdOfSection(sectionIndex: number) {
    // check if the array contains any element
    if (this.sopStepsList.length === 1) {
      // if no element is there then it is the first element
      return null;
    }
    // if the user is creating a section at the end of the 'sopStepsList' then return null
    if (sectionIndex === this.sopStepsList.length - 1) {
      return null;
    } else {
      // if the user is creating a section at the middle of the 'sopStepsList' then return the 'next_insertion_id' for the next element
      return +this.sopStepsList[sectionIndex + 1]['insertion_id'];
    }
  }
}
