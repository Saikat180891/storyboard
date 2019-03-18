/**
 * Author: Saikat Paul
 * Designation: Frontend Engineer, Soroco
 */
import { Component, OnInit } from "@angular/core";
import { DataService } from "../../../data.service";
import { SectionListItem } from "../common-model/section-list-item.model";
import { Step } from "../common-model/step-type.model";
import { PageService } from "../services/page/page.service";
import { RightPanelService } from "../services/right-panel/right-panel.service";
import { StepcontrolService } from "../services/stepcontrol/stepcontrol.service";
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

  constructor(
    private __steps: StepcontrolService,
    private __api: DataService,
    private __page: PageService,
    private __rpService: RightPanelService
  ) {}

  /**
   * get the section list and render it in the browser
   */
  ngOnInit() {
    // fetch all the previously created section when the component loads
    this.__rpService
      .getListOfCreatedSectionFromServer(this.__page.userStoryId)
      .subscribe(
        res => {
          // store the response in the step control service
          this.__steps.setSectionList(res);
        },
        err => {
          // initiate the 'sectionList' with the step control service
          this.sectionList = this.__steps.getList();
        },
        () => {
          // initiate the 'sectionList' with the step control service
          this.sectionList = this.__steps.getList();
        }
      );
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
    this.__steps.insertStep($event.index, $event.data);
  }

  /**
   * this will create a new section in the memory but will not
   * make any request yet
   */
  onCreateNewSection() {
    this.__steps.appendSection();
  }

  /**
   * this function will delete a step
   * @param $event
   */
  onDeleteStep($event) {
    if ($event.mode === "local") {
      this.__steps.deleteStep($event.sectionIndex, $event.stepIndex);
    } else if ($event.mode === "server") {
      this.__rpService
        .deleteStep(
          this.__page.userStoryId,
          $event.stepId,
          $event.insertionId,
          $event.sectionInsertionId
        )
        .subscribe(res => {
          this.__steps.deleteStep($event.sectionIndex, $event.stepIndex);
        });
    }
  }

  /**
   * this function will delete a section from the db
   * @param $event
   */
  onDeleteSection($event: Event) {
    if (
      confirm(
        "Are you sure you want to delete this section? All the steps related to this section will also be deleted."
      )
    ) {
      this.__rpService
        .deleteSection(
          this.__page.userStoryId,
          $event["sectionId"],
          $event["insertionId"]
        )
        .subscribe(res => {
          this.__steps.deleteSection($event["sectionIndex"]);
        });
    }
  }

  /**
   * this function will be triggered to create steps
   * @param $event
   */
  onOutputChange($event) {
    if ($event.mode === "create") {
      const payload = {
        prev_insertion_id: this.__steps.getPreviousInsertionIdOfStepInSection(
          $event.sectionIndex,
          $event.stepIndex
        ),
        next_insertion_id: this.__steps.getNextInsertionIdOfStepInSection(
          $event.sectionIndex,
          $event.stepIndex
        ),
        section_insertion_id: $event.sectionId,
        step_group_insertion_id: "",
        propagate: true,
        type: $event.stepType,
        data: $event.data,
        screen_id:
          typeof $event.data.screen === "string" ? null : $event.data.screen,
      };
      this.__rpService
        .createStep(this.__page.userStoryId, $event.sectionId, payload)
        .subscribe(res => {
          this.__steps.updateStepWithResponse(
            $event.sectionIndex,
            $event.stepIndex,
            res
          );
        });
    } else if ($event.mode === "edit") {
      const payload = {
        type: $event.stepType,
        data: $event.data,
        screen_id:
          typeof $event.data.screen === "string" ? null : $event.data.screen,
      };
      this.__rpService
        .updateStep($event.stepId, payload)
        .subscribe((res: Step) => {
          this.__steps.modifyStepOnEdit(
            $event.sectionIndex,
            $event.stepIndex,
            res
          );
        });
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
    // to create a section
    if ($event.mode === "create") {
      const payload = {
        section_name: $event["sectionName"]["section_name"],
        prev_insertion_id: this.__steps.getPreviousInsertionIdOfSection(
          $event["sectionIndex"]
        ),
        next_insertion_id: this.__steps.getNextInsertionIdOfSection(
          $event["sectionIndex"]
        ),
        description: "test",
      };
      // make the call with the payload and body
      this.__rpService
        .createSection(this.__page.userStoryId, payload)
        .subscribe(res => {
          this.__steps.setSectionItem(res, $event["sectionIndex"]);
        });
      // to edit a section
    } else if ($event.mode === "edit") {
      const payload = {
        section_name: $event["sectionName"]["section_name"],
        section_id: $event.sectionId,
        description: "test",
      };
      // make the call with the payload and body
      this.__rpService
        .updateSection($event.sectionId, payload)
        .subscribe(res => {
          this.__steps.updateSectionItem(res, $event["sectionIndex"]);
        });
    }
  }
}
