import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-step-condition',
  templateUrl: './step-condition.component.html',
  styleUrls: ['./step-condition.component.scss']
})
export class StepConditionComponent implements OnInit {
  @Input('sectionId') sectionId:number;
  @Input('stepIndex') stepIndex:number;
  canEdit:boolean = false;
  addAnotherRow:any = [1];
  conditionSelection

  constructor() { }

  ngOnInit() {
  }

  onClikedOnEdit(){
    this.canEdit = false;
  }

  onClickOnOk(){
    this.canEdit = true;
  }

  onAddAnotherRow(){
    this.addAnotherRow.push(1);
  }

  onDeleteNewRow(index:number){
    this.addAnotherRow.splice(index, 1);
  }

  onChangeSelection($event){
    console.log(this.conditionSelection)
  }
}
