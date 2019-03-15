/**
 * Author: Saikat Paul
 * Designation: Frontend Engineer, Soroco
 */
import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {StepcontrolService} from '../../services/stepcontrol/stepcontrol.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { SectionListItem } from '../../common-model/section-list-item.model';
import { OperationBarService } from '../../services/operation-bar/operation-bar.service';
@Component({
  selector: 'app-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent implements OnInit, OnChanges {
  @Input('sectionId') sectionId:number;
  @Input('stepParameters') stepParameters: SectionListItem;
  @Input('sectionIndex') sectionIndex:number;
  @Output('sectionPayload') sectionPayload = new EventEmitter<any>();
  @Output('deleteStep') deleteStep = new EventEmitter();
  @Output('outputChange') outputChange = new EventEmitter();
  @Output('sectionChange') sectionChange = new EventEmitter();
  @Output('deleteSection') deleteSection = new EventEmitter();

  // to make section name editable
  isSectionNameEditable:boolean = true;
  // to collapse the accordion
  isCollapsed:boolean = false;

  // form to store section name
  section = new FormGroup({
    section_name: new FormControl('', Validators.required)
  });

  constructor(private __step: StepcontrolService, private __opbService: OperationBarService) {}

  /**
   * if section name is already present(which happens when the page loads)
   * then set the value of the formcontrol and make the editable flag false
   */
  ngOnInit() {
    if ( this.stepParameters.section_name !== null ) {
      this.section.setValue({
        section_name  : this.stepParameters.section_name
      });
    } else {
      this.isSectionNameEditable = false;
    }
  }

  ngOnChanges() {
  }

  // to collapse the accordion
  onCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  // to delete the section
  onDeleteSection() {
    this.deleteSection.emit({
      sectionId: this.sectionId,
      sectionIndex: this.sectionIndex,
      insertionId: this.stepParameters.insertion_id
    });
  }

  allowDrop($event: Event) {
    $event.preventDefault();
  }

  /**
   * this function is triggered the user drops a step on the droppable area
   * @param $event 
   */
  onDropData($event: string) {
    this.sectionPayload.emit({
      data: $event,
      index: this.sectionIndex
    });
    if ($event === 'start-loop' || $event === 'end-loop') {
      this.__opbService.toggleLoop();
    }
  }

  /**
   * this function is used to create as well as delete a section
   * for editing a section the function will check for section_id
   * parameter in the stepParameters object. This will be present
   * only when the user edits the name of a section. This field is
   * generated from the backend so it is not present while creating
   * a section
   */
  onCreateSection() {
    if (this.section.valid) {
      this.isSectionNameEditable = !this.isSectionNameEditable;
      if (this.stepParameters.section_id) {
        this.sectionChange.emit({
          sectionName: this.section.value, 
          sectionIndex: this.sectionIndex, 
          mode: 'edit', 
          sectionId: this.stepParameters.section_id
        });
      } else {
        this.sectionChange.emit({
          sectionName: this.section.value, 
          sectionIndex: this.sectionIndex, 
          mode: 'create'
        });
      }
    }
  }

  /**
   * this function is used to close the section edit box
   * the function will also remove the section if there
   * is not section name
   */
  onSectionEditClose() {
    if (!this.section.value.section_name && !this.stepParameters.section_id) {
      this.__step.deleteSection(this.sectionIndex);
    } else if (!this.section.value.section_name && this.stepParameters.section_id) {
      this.section.patchValue({
        section_name  : this.stepParameters.section_name
      });
    }
    this.isSectionNameEditable = true;
  }

  /**
   * this function is used to move steps inside section
   * @param event
   */
  drop(event: CdkDragDrop<string[]>) {
    this.__step.moveStepsInsideSection(this.sectionIndex, event.previousIndex, event.currentIndex);
  }

  // convey the delete message to the parent component
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

  // toggle section name editable
  onEditSectionName() {
    this.isSectionNameEditable = !this.isSectionNameEditable;
  }

}
