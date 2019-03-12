import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import {StepcontrolService} from '../../services/stepcontrol/stepcontrol.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent implements OnInit, OnChanges {
  @Input('sectionId') sectionId:number;
  @Input('stepParameters') stepParameters:any;
  @Input('sectionIndex') sectionIndex:number;
  @Output('sectionPayload') sectionPayload = new EventEmitter<any>();
  @Output('deleteStep') deleteStep = new EventEmitter();
  @Output('outputChange') outputChange = new EventEmitter();
  @Output('sectionChange') sectionChange = new EventEmitter();
  @ViewChild('sectionHeight') sectionHeight: ElementRef;

  openEditSectionName:boolean = false;
  isSectionNameEditable:boolean = true;
  isCollapsed:boolean = false;
  accordianHeight: string;

  panelOpenState = false;

  section_name:string = '';

  section = new FormGroup({
    section_name: new FormControl('', Validators.required)
  });

  constructor(private stepCtrl:StepcontrolService, private render: Renderer2) {}

  ngOnInit() {
    if (this.section_name === '') {
      this.isSectionNameEditable = false;
    }
  }

  ngOnChanges() {
  }

  onCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  allowDrop($event: Event) {
    $event.preventDefault();
  }

  onDropData($event: Event) {
    this.sectionPayload.emit({
      data: $event,
      index: this.sectionIndex
    });
  }

  onCreateSection() {
    if (this.section.valid) {
      this.isSectionNameEditable = !this.isSectionNameEditable;
      this.sectionChange.emit({sectionName: this.section.value, sectionIndex: this.sectionIndex});
    }
  }

  onRemoveSectionName() {
    if (!this.section_name) {
      this.stepCtrl.removeSection(this.sectionIndex);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    // moveItemInArray(this.stepCtrl.sopStepsList[this.sectionIndex].steps_list, event.previousIndex, event.currentIndex);
  }

  onDeleteStep($event: Event){
    this.deleteStep.emit($event);
  }

  /**
   * this function contains the data of a step
   * @param $event 
   */
  onOutputChange($event: Event){
    this.outputChange.emit($event);
  }

  onEditSectionName() {
    this.isSectionNameEditable = !this.isSectionNameEditable;
  }

}
