/**
 * Author: Saikat Paul
 * Designation: Frontend Engineer, Soroco
 */
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { SectionListItem } from "../../common-model/section-list-item.model";
import { LeftPanelService } from "../../services/left-panel/left-panel.service";
import { RightPanelService } from "../../services/right-panel/right-panel.service";
import { StepcontrolService } from "../../services/stepcontrol/stepcontrol.service";
import { StepsContainerComponent } from "../steps-container.component";

@Component({
  selector: "app-section-title",
  templateUrl: "./section-title.component.html",
  styleUrls: ["./section-title.component.scss"],
})
export class SectionTitleComponent implements OnInit {
  @Input("sectionId") sectionId: number;
  @Input("stepParameters") stepParameters: SectionListItem = {
    section_name: null,
    steps_list: [],
  };
  @Input("sectionIndex") sectionIndex: number;
  @Output("sectionPayload") sectionPayload = new EventEmitter<any>();
  @Output("deleteStep") deleteStep = new EventEmitter();
  @Output("outputChange") outputChange = new EventEmitter();
  @Output("sectionChange") sectionChange = new EventEmitter();
  @Output("deleteSection") deleteSection = new EventEmitter();
  @Output("downloadAttachment") downloadAttachment = new EventEmitter();
  @Output("attachmentDelete") attachmentDelete = new EventEmitter();

  @ViewChildren("stepContainerToken") containerChildren: QueryList<
    StepsContainerComponent
  >;

  // to make section name editable
  isSectionNameEditable: boolean = true;
  // to collapse the accordion
  isCollapsed: boolean = false;
  hightLightStep: number = -1;

  // form to store section name
  section = new FormGroup({
    section_name: new FormControl("", Validators.required),
  });

  constructor(
    private __step: StepcontrolService,
    private __rpService: RightPanelService,
    private leftPanelService: LeftPanelService
  ) {}

  /**
   * if section name is already present(which happens when the page loads)
   * then set the value of the formcontrol and make the editable flag false
   */
  ngOnInit() {
    if (this.stepParameters.section_name !== null) {
      this.section.setValue({
        section_name: this.stepParameters.section_name,
      });

      // this is to set the first section's, first step as active,so that
      // associated screen shot can be updated.
      // Bug - 7943
      setTimeout(() => {
        if (
          this.stepParameters &&
          this.stepParameters.steps_list &&
          this.stepParameters.steps_list.length &&
          !this.leftPanelService.getCurrentActiveStepId()
        ) {
          this.hightLightStep = this.stepParameters.steps_list[0].step_id;
          const screenId = this.stepParameters.steps_list[0].screen_id;
          this.leftPanelService.setCurrentActiveStepId(this.hightLightStep);
          this.onSelectStep(this.hightLightStep, screenId);
        }
      }, 100);
    } else {
      this.isSectionNameEditable = false;
    }

    this.__rpService.getHighlighterStepId().subscribe(res => {
      this.hightLightStep = res.stepId;
      this.leftPanelService.setCurrentScreen(res.screenId);
    });

    this.saveAllChildren();
  }

  onSelectStep(stepId: number, screenId: number) {
    this.__rpService.setHighlighter({ stepId, screenId });
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
      insertionId: this.stepParameters.insertion_id,
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
    this.saveAndCloseAllChildren();
    this.sectionPayload.emit({
      data: $event,
      index: this.sectionIndex,
    });
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
          mode: "edit",
          sectionId: this.stepParameters.section_id,
        });
      } else {
        this.sectionChange.emit({
          sectionName: this.section.value,
          sectionIndex: this.sectionIndex,
          mode: "create",
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
    if (!this.stepParameters.section_id) {
      this.__step.deleteSection(this.sectionIndex);
      this.sectionChange.emit({
        mode: "cancel",
      });
    } else {
      this.section.patchValue({
        section_name: this.__step.getSopSectionList()[this.sectionIndex][
          "section_name"
        ],
      });
    }
    this.isSectionNameEditable = true;
  }

  /**
   * this function is used to move steps inside section
   * @param event
   */
  drop(event: CdkDragDrop<string[]>) {
    this.__step.moveStepsInsideSection(
      this.sectionIndex,
      event.previousIndex,
      event.currentIndex
    );
  }

  // convey the delete message to the parent component
  onDeleteStep($event: Event) {
    if ($event["mode"] === "server") {
      this.deleteStep.emit(
        Object.assign(
          { sectionInsertionId: this.stepParameters.insertion_id },
          $event
        )
      );
    } else {
      this.deleteStep.emit($event);
    }
  }

  /**
   * this function contains the data of a step
   * @param $event
   */
  onOutputChange($event: Event) {
    this.outputChange.emit($event);
  }

  // toggle section name editable
  onEditSectionName() {
    this.isSectionNameEditable = !this.isSectionNameEditable;
  }

  saveAllChildren() {
    this.__step.getShouldChildrenBeSaved().subscribe(res => {
      if (res) {
        this.saveAndCloseAllChildren();
      }
    });
  }

  /**
   * This function finds all StepComponents that are in edit mode,
   * saves them, and exits out of edit mode.
   */
  saveAndCloseAllChildren() {
    if (this.containerChildren && this.containerChildren.length) {
      this.containerChildren.forEach(container => {
        const stepChild = container.stepChild;
        if (stepChild.canEdit) {
          stepChild.onClickOnOk();
        }
      });
    }
  }

  onAttachmentDelete($event) {
    this.attachmentDelete.emit($event);
  }
  onAttachmentDownload($event) {
    this.downloadAttachment.emit($event);
  }
}
