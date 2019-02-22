import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {StepcontrolService} from '../../services/stepcontrol/stepcontrol.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent implements OnInit, OnChanges {
  @Input('stepParameters') stepParameters:any;
  @Input('externalStepIndex') externalStepIndex:number;
  @Output('sectionPayload') sectionPayload = new EventEmitter<any>();
  openEditSectionName:boolean = false;
  isSectionNameEditable:boolean = true;
  isCollapsed:boolean = false;

  sectionName:string = 'Section Name';

  constructor(private stepCtrl:StepcontrolService) {}

  ngOnInit() {
    if(this.sectionName === ''){
      this.isSectionNameEditable = false;
    }
  }
  
  ngOnChanges(){
    console.log(this.stepParameters)
  }

  onCollapse(){
    this.isCollapsed = !this.isCollapsed;
  }

  allowDrop($event){
    $event.preventDefault();
  }

  onDropData($event:any){
    this.sectionPayload.emit({
      data: $event,
      index: this.externalStepIndex
    });
    console.log($event);
  }

  onCheckedSectionName(){
    this.isSectionNameEditable = !this.isSectionNameEditable;
  }

  onRemoveSectionName(){
    if(!this.sectionName){
      this.stepCtrl.removeSection(this.externalStepIndex);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.stepCtrl.sopStepsList[this.externalStepIndex].steps, event.previousIndex, event.currentIndex);
  }
}
