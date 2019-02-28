import { Injectable } from '@angular/core';
interface StepList{
  sectionName:string;
  steps:any[];
  id?:number;
}

@Injectable({
  providedIn: 'root'
})
export class StepcontrolService {

  sopStepsList:StepList[] = [
    {
      sectionName: 'section name',
      steps:[]
    }
  ];

  constructor() { }

  /**
   * 
   * @param index 
   * @param data 
   */
  insertStep(index, data){
    this.sopStepsList[index].steps.push(data);
  }

  /**
   * Creates a new section
   */
  appendSection(){
    let data = {
      sectionName: '',
      steps:[],
      id: -1
    }
    this.sopStepsList.push(data);
  }

  /**
   * this function is used to modity section properties
   * @param responseData data received from backend will the over write the respected values of section
   * @param sectionIndex is required to find where to modify
   * NOTE: steps are not modified
   */
  editSectionDetailsWithResponse(responseData:any, sectionIndex:number){
    this.sopStepsList[sectionIndex].sectionName = responseData.section_name;
    this.sopStepsList[sectionIndex].id = responseData.id;
  }

  /**
   * this function modifies the step value inside a particular section
   * @param responseData step data received from backend
   * @param sectionIndex frontend index of section
   * @param stepIndex frontend index of steps array
   */
  editStepValues(responseData:any, sectionIndex:number, stepIndex:number){
    this.sopStepsList[sectionIndex].steps[stepIndex] = responseData;
  }

  insertSectionAt(indexAfter){
    let data = {
      sectionName: 'section name',
      steps:[]
    }
    this.sopStepsList.splice(indexAfter, 0, data);
  }

  moveItem(newPosition, previousPosition, data){
    this.sopStepsList.splice(newPosition, 0, data);
  }

  removeSection(sectionIndex:number){
    this.sopStepsList.splice(sectionIndex, 1);
  }

  getList(){
    return this.sopStepsList;
  }

  getListLength(){
    return this.sopStepsList.length;
  }

  deleteStep(sectionIndex, stepIntex){
    this.sopStepsList[sectionIndex].steps.splice(stepIntex, 1);
  }
}
