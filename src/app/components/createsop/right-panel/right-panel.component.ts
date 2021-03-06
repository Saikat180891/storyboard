import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { saveAs } from "file-saver";
import { NgxSpinnerService } from "ngx-spinner";
import { DataService } from "../../../data.service";
import { SharedService } from "../../../services/shared-services/shared.service";
import { Mode } from "../../projects/models/enums";
import { ConfirmModalWithOptionService } from "../../shared/confirm-modal-with-options/confirm-modal.service";
import { ConfirmModalService } from "../../shared/confirm-modal/confirm-modal.service";
import { SectionListItem } from "../common-model/section-list-item.model";
import { LeftPanelService } from "../services/left-panel/left-panel.service";
import { PageService } from "../services/page/page.service";
import { RightPanelService } from "../services/right-panel/right-panel.service";
import { StepcontrolService } from "../services/stepcontrol/stepcontrol.service";
import { SectionTitleComponent } from "../steps-container/section-title/section-title.component";

interface StepTypeDropEvent {
  data: string;
  index: number;
}
@Component({
  selector: "right-panel",
  templateUrl: "./right-panel.component.html",
  styleUrls: ["./right-panel.component.scss"],
})
export class RightPanelComponent implements OnInit {
  /**
   * 'sectionList' is the main array and it has collection of objects
   */
  sectionList: SectionListItem[] = [];
  @ViewChild("rightPanelInfiniteScroll") rightPanelInfiniteScroll: ElementRef;
  @ViewChild("section") section: QueryList<ElementRef>;
  @ViewChildren("section") sections: QueryList<SectionTitleComponent>;
  isSectionApiRunning: boolean = false;
  isCreateConditionSection: boolean = false;
  isCreationSection: boolean = false;

  constructor(
    private stepcontrolService: StepcontrolService,
    private dataService: DataService,
    private pageService: PageService,
    private rightPanelService: RightPanelService,
    private confirm: ConfirmModalService,
    private confirmWithOptions: ConfirmModalWithOptionService,
    private leftPanelService: LeftPanelService,
    private snackBar: MatSnackBar,
    private ngxSpinnerService: NgxSpinnerService,
    private sharedService: SharedService
  ) {}

  /**
   * get the section list and render it in the browser
   */
  ngOnInit() {
    this.init();
  }

  init() {
    // fetch all the previously created section when the component loads
    this.rightPanelService
      .getListOfCreatedSectionFromServer(this.pageService.userStoryId)
      .subscribe(
        res => {
          // store the response in the step control service
          this.stepcontrolService.setSectionList(res);
          if (res && res.length === 0) {
            this.leftPanelService.setCurrentScreen(null);
          }
        },
        err => {
          // initiate the 'sectionList' with the step control service
          this.sectionList = this.stepcontrolService.getList();
        },
        () => {
          // initiate the 'sectionList' with the step control service
          this.sectionList = this.stepcontrolService.getList();
          this.ngxSpinnerService.hide();
        }
      );

    this.rightPanelService
      .infiniteScrollHandler(this.rightPanelInfiniteScroll)
      .subscribe(res => {
        this.rightPanelService.setScrollPosition(res.target.scrollTop);
      });
  }

  /**
   * this function is triggered when the user drops a button at the dropable area
   * an event called 'sectionPayload' is triggered and which contains a payload
   * generated from the child component called section-title.component.ts
   * -$event is an object and contains the following:-
   * -- data  -> it contains the type of button/step that is dragged over the droppable area,
   * so every button/step that is dragged has a data attribute emdedded in it which contains
   * the value of the button ex: 'Read', 'Type' etc.
   * -- index -> it is the section index where the button is dropped
   * @param $event
   * @param index it is the section index i.e. the position of that section in the
   * 'sopStepsList' array present in the stepcontrol.service.ts file
   */
  onButtonDragged($event: StepTypeDropEvent, index: number) {
    this.stepcontrolService.insertStep($event.index, $event.data);
  }

  /**
   * this will create a new section in the memory but will not
   * make any request yet
   */
  onCreateNewSection() {
    if (!(this.isCreateConditionSection || this.isCreationSection)) {
      this.stepcontrolService.appendSection();
      this.isCreationSection = true;
    }
  }

  onCreateConditionSection() {
    if (!(this.isCreateConditionSection || this.isCreationSection)) {
      this.stepcontrolService.appendSection();
      this.isCreateConditionSection = true;
    }
  }

  deleteStep($event, propagate: boolean) {
    this.rightPanelService
      .deleteStep(
        this.pageService.userStoryId,
        $event.stepId,
        $event.insertionId,
        $event.sectionInsertionId,
        propagate
      )
      .subscribe(res => {
        this.stepcontrolService.deleteStep(
          $event.sectionIndex,
          $event.stepIndex,
          propagate,
          res
        );
      });
  }

  /**
   * this function will delete a step
   * @param $event
   */
  onDeleteStep($event) {
    if ($event.mode === Mode.local) {
      this.stepcontrolService.deleteStep(
        $event.sectionIndex,
        $event.stepIndex,
        true,
        ""
      );
    } else if ($event.mode === Mode.server) {
      let propagate = true;
      if (this.sectionList[$event.sectionIndex].section_link) {
        this.confirmWithOptions.confirmDialog(
          this.sectionList[$event.sectionIndex].section_name,
          this.sectionList[$event.sectionIndex].copy_list,
          () => {
            this.deleteStep($event, propagate);
          },
          () => {
            propagate = false;
            this.deleteStep($event, propagate);
          }
        );
      } else {
        this.deleteStep($event, propagate);
      }
    }
  }

  /**
   * this function will delete a section from the db
   * @param $event
   */
  onDeleteSection($event: Event) {
    this.confirm.confirmDelete(
      "Are you sure you want to delete this section? All the steps related to this section will also be deleted.",
      () => {
        this.rightPanelService
          .deleteSection(
            this.pageService.userStoryId,
            $event["sectionId"],
            $event["insertionId"]
          )
          .subscribe(res => {
            this.stepcontrolService.deleteSection($event["sectionIndex"]);
          });
      }
    );
  }

  onCreateStep($event, propagate: boolean) {
    const payload = {
      prev_insertion_id: this.stepcontrolService.getPreviousInsertionIdOfStepInSection(
        $event.sectionIndex,
        $event.stepIndex
      ),
      next_insertion_id: this.stepcontrolService.getNextInsertionIdOfStepInSection(
        $event.sectionIndex,
        $event.stepIndex
      ),
      section_insertion_id: $event.sectionInsertionId,
      propagate,
      type: $event.stepType,
      data: $event.data,
      attachment: null,
      screen_id:
        typeof $event.data.screen === "string" ? null : $event.data.screen,
    };
    this.rightPanelService
      .createStep(this.pageService.userStoryId, $event.sectionId, payload)
      .subscribe(
        res => {
          this.leftPanelService.setCurrentScreen($event.data.screen);
          this.stepcontrolService.updateStepWithResponse(
            $event.sectionIndex,
            $event.stepIndex,
            res,
            propagate
          );
          this.stepcontrolService.setStepEditMode(false);
        },
        err => {
          this.sharedService.raiseError(err);
        }
      );
  }

  onEditStep($event, propagate) {
    const formData = new FormData();
    formData.append("type", $event.stepType);
    formData.append("data", JSON.stringify($event.data));
    formData.append("propagate", propagate);
    formData.append("section_insertion_id", $event.sectionInsertionId);
    formData.append("us_id", $event.userStoryId);
    if ($event.attachment instanceof File) {
      formData.append("attachment", $event.attachment);
    } else {
      formData.append("attachment", "");
    }
    formData.append(
      "attachment_delete",
      $event.attachmentDelete ? $event.attachmentDelete : false
    );
    formData.append(
      "screen_id",
      typeof $event.data.screen === "number" ? $event.data.screen : ""
    );

    this.rightPanelService.updateStep($event.stepId, formData).subscribe(
      res => {
        this.leftPanelService.setCurrentScreen($event.data.screen);
        this.stepcontrolService.modifyStepOnEdit(
          $event.sectionIndex,
          $event.stepIndex,
          res,
          propagate
        );
        if ($event.attachment instanceof File) {
          this.snackBar.open("Attachment added successfully", "Success", {
            duration: 3000,
          });
        }
        this.stepcontrolService.setStepEditMode(false);
      },
      err => {
        this.sharedService.raiseError(err);
      }
    );
  }

  /**
   * this function will be triggered to create steps
   * @param $event
   */
  onOutputChange($event) {
    let propagate = true;
    if (this.sectionList[$event.sectionIndex].section_link) {
      this.confirmWithOptions.confirmDialog(
        this.sectionList[$event.sectionIndex].section_name,
        this.sectionList[$event.sectionIndex].copy_list,
        () => {
          propagate = true;
          if ($event.mode === Mode.create) {
            this.onCreateStep($event, propagate);
          } else {
            this.onEditStep($event, propagate);
          }
        },
        () => {
          propagate = false;
          if ($event.mode === Mode.create) {
            this.onCreateStep($event, propagate);
          } else {
            this.onEditStep($event, propagate);
          }
        }
      );
    } else {
      if ($event.mode === Mode.create) {
        this.onCreateStep($event, propagate);
      } else {
        this.onEditStep($event, propagate);
      }
    }
  }

  /**
   * this function can make alternative request to the db to create as well
   * as to edit a section
   * @param $event contains the section name and section index in frontend
   * it also contains another flag called mode which is used as a switch to
   * execute the edit or the create block
   */
  onSectionChange($event) {
    if ($event.mode === "cancel") {
      this.isCreateConditionSection = false;
      this.isCreationSection = false;
      return;
    }
    // to create a section
    if ($event.mode === Mode.create) {
      const payload = {
        section_name: $event["sectionName"]["section_name"],
        prev_insertion_id: this.stepcontrolService.getPreviousInsertionIdOfSection(
          $event["sectionIndex"]
        ),
        next_insertion_id: this.stepcontrolService.getNextInsertionIdOfSection(
          $event["sectionIndex"]
        ),
        description: "test",
      };
      // make the call with the payload and body
      this.rightPanelService
        .createSection(this.pageService.userStoryId, payload)
        .subscribe(res => {
          this.stepcontrolService.setSectionItem(res, $event["sectionIndex"]);
          this.isCreationSection = false;

          if (this.isCreateConditionSection) {
            this.onButtonDragged(
              { data: "condition", index: $event["sectionIndex"] },
              $event["sectionIndex"]
            );
            this.isCreateConditionSection = false;
          }
        });
      // to edit a section
    } else if ($event.mode === Mode.edit) {
      const payload = {
        section_name: $event["sectionName"]["section_name"],
        section_id: $event.sectionId,
        description: "test",
        insertion_id: $event.insertionId,
        us_id: $event.userStoryId,
      };
      // make the call with the payload and body
      this.rightPanelService
        .updateSection($event.sectionId, payload, $event.propagate)
        .subscribe(res => {
          this.stepcontrolService.updateSectionItem(
            res,
            $event["sectionIndex"],
            $event.propagate
          );
        });
    }
    this.sectionList = this.stepcontrolService.getList();
  }

  onDownloadAttachment($event) {
    this.rightPanelService
      .downloadAttachment($event.url)
      .subscribe((data: Blob) => saveAs(data, $event.fileName));
  }

  onAttachmentDelete($event) {
    this.confirm.confirmDelete(
      "Are you sure you want to delete this attachment?",
      () => {
        this.onOutputChange($event);
      }
    );
  }
}
