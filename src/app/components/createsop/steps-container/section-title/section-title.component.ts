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
  @Input('sectionIndex') sectionIndex:number;
  @Output('sectionPayload') sectionPayload = new EventEmitter<any>();
  @Output('deleteStep') deleteStep = new EventEmitter();
  @Output('outputChange') outputChange = new EventEmitter();
  @Output('sectionChange') sectionChange = new EventEmitter();

  openEditSectionName:boolean = false;
  isSectionNameEditable:boolean = true;
  isCollapsed:boolean = false;

  section_name:string = '';

  constructor(private stepCtrl:StepcontrolService) {}

  ngOnInit() {
    if(this.section_name === ''){
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
      index: this.sectionIndex
    });
    console.log($event);
  }

  onCheckedSectionName(){
    if(!this.section_name){
      this.stepCtrl.removeSection(this.sectionIndex);
    }else{
      this.isSectionNameEditable = !this.isSectionNameEditable;
      this.sectionChange.emit({sectionName:this.section_name, sectionIndex:this.sectionIndex});    
    }
  }

  onRemoveSectionName(){
    if(!this.section_name){
      this.stepCtrl.removeSection(this.sectionIndex);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.stepCtrl.sopStepsList[this.sectionIndex].steps, event.previousIndex, event.currentIndex);
  }

  onDeleteStep($event:Event){
    this.deleteStep.emit($event);
  }

  onOutputChange($event:Event){
    this.outputChange.emit($event);
  }

}
