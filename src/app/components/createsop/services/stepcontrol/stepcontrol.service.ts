import { Injectable } from '@angular/core';
interface StepList{
  sectionName:string;
  steps:any[];
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

  insertStep(index, data){
    this.sopStepsList[index].steps.push(data);
  }

  appendSection(indexAfter){
    let data = {
      sectionName: 'section name',
      steps:[]
    }
    this.sopStepsList.push(data);
  }

  insertSectionAt(indexAfter){
    let data = {
      sectionName: 'section name',
      steps:[]
    }
    this.sopStepsList.splice(indexAfter, 0, data);
  }

  getList(){
    return this.sopStepsList;
  }

  getListLength(){
    return this.sopStepsList.length;
  }
}
