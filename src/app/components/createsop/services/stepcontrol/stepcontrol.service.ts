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

  insertItem(index, data){
    this.sopStepsList[index].steps.push(data);
  }

  getList(){
    return this.sopStepsList;
  }
}
