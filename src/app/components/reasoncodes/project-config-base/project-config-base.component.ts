import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ConfirmModalService } from "../../../components/shared/confirm-modal/confirm-modal.service";
import { SharedService } from "../../../services/shared-services/shared.service";
import { Epics } from "../models/Epics.model";
import { Sprint } from "../models/Sprint.model";
import { ReasonCodeService } from "../reason-code.service";
import { ApiService } from "../services/api.service";
import { ProjectConfigureService } from "../services/project-configure.service";

import {
  arrangeEndDateForBackend,
  convertStartDateforBackend,
} from "../../shared/date-utils";

@Component({
  selector: "app-project-config-base",
  template: "",
})
export class ProjectConfigBaseComponent implements OnInit {
  @Input("previouslySavedEpics") previouslySavedEpics;
  @Input("sprintConfigData") sprintConfigData: Sprint[];
  @Output("close") close = new EventEmitter<boolean>();

  addNewEpics: Epics[] = [];
  changeDetectedInEpics = [];
  addMoreSprints = [];
  preExistingSprintModified = [];

  constructor(
    private apiEnpointService: ApiService,
    private projectConfigureService: ProjectConfigureService,
    private reasonCodeService: ReasonCodeService,
    private confirm: ConfirmModalService,
    public snackbar: MatSnackBar,
    private sharedService: SharedService
  ) {}

  ngOnInit() {}

  onAddMoreSprints() {
    this.addMoreSprints.push({});
  }

  onPreexistingSprint($event: number, sprintIndex: number) {
    this.confirm.confirmDelete(
      "Are you sure you want to delete this sprint?",
      () => {
        this.apiEnpointService.deleteSprint($event).subscribe(res => {
          this.projectConfigureService.deleteSprint(sprintIndex);
        });
      }
    );
  }

  onClose() {
    this.close.emit(false);
  }

  createNewSprints() {
    if (this.addMoreSprints.length > 0) {
      this.addMoreSprints = removeUnnecessaryElements(this.addMoreSprints);
      const sprints = this.addMoreSprints.map((element: Sprint) => {
        return {
          duration: element.duration,
          end_date: convertStartDateforBackend(new Date(element.endDate)),
          sprint_name: element.sprintName,
          start_date: convertStartDateforBackend(new Date(element.startDate)),
        };
      });
      sprints.forEach(sprint => {
        this.apiEnpointService
          .createSprint(this.reasonCodeService.sopId, sprint)
          .subscribe(
            res => {
              this.projectConfigureService.addSprint(res);
              this.snackbar.open("Created a new Sprint", "Success", {
                duration: 5000,
              });
            },
            err => {
              this.sharedService.raiseError(err);
            }
          );
      });
      this.addMoreSprints = [];
    }
  }

  saveEdittedSprints() {
    if (this.preExistingSprintModified.length > 0) {
      this.preExistingSprintModified = removeEmptyElements(
        this.preExistingSprintModified
      );
      const sprints = this.preExistingSprintModified.map((sprint: Sprint) => {
        return {
          id: sprint.id,
          values: {
            duration: sprint.duration,
            end_date: convertStartDateforBackend(new Date(sprint.endDate)),
            sprint_name: sprint.sprintName,
            start_date:
              typeof sprint.startDate === "string"
                ? sprint.startDate
                : convertStartDateforBackend(new Date(sprint.startDate)),
          },
        };
      });
      sprints.forEach(sprint => {
        this.apiEnpointService
          .editSprint(sprint.id, sprint.values)
          .subscribe((res: Sprint) => {
            this.projectConfigureService.updateSprint(res, res.id);
          });
      });
      this.preExistingSprintModified = [];
    }
  }

  saveSprints() {
    this.createNewSprints();
    this.saveEdittedSprints();
  }

  onSave() {
    this.saveSprints();
    this.saveEpics();
    this.onClose();
  }

  ondeleteSprint($event) {
    this.addMoreSprints.splice($event, 1);
  }

  onAddNewEpics() {
    const temObj = {
      name: "Epic X",
    };
    this.addNewEpics.push(temObj);
  }

  onDeleteEpics(selected: number) {
    this.addNewEpics.splice(selected, 1);
  }

  onDeleteCreatedEpic(id: number) {
    this.confirm.confirmDelete(
      "Are you sure you want to delete this epic?",
      () => {
        this.reasonCodeService.deleteReasonCode(id);
        this.reasonCodeService.refresh(this.reasonCodeService.sopId);
      }
    );
  }

  onPreviouslyCreatedEpicsChanged(index: number) {
    this.changeDetectedInEpics[index] = true;
  }

  isChangeDetectedInPreviouslyCreatedEpics() {
    return this.changeDetectedInEpics.length > 0 ? true : false;
  }

  isNewEpicsCreated() {
    return this.addNewEpics.length > 0 ? true : false;
  }

  savePreviousEpicsIfEditted() {
    this.changeDetectedInEpics.forEach((element, index) => {
      if (element && !(this.previouslySavedEpics[index].name === "")) {
        this.reasonCodeService.editEpic(
          this.previouslySavedEpics[index].id,
          this.previouslySavedEpics[index]
        );
      }
    });
    this.changeDetectedInEpics = [];
  }

  saveNewlyCreatedEpics() {
    this.addNewEpics.forEach((element, index) => {
      if (element.name === "") {
        this.addNewEpics.splice(index, 1);
      } else {
        this.reasonCodeService.createReasonCode(
          this.reasonCodeService.sopId,
          element
        );
      }
    });
    this.addNewEpics = [];
  }

  saveEpics() {
    if (this.isChangeDetectedInPreviouslyCreatedEpics()) {
      this.savePreviousEpicsIfEditted();
    } else if (this.isNewEpicsCreated()) {
      this.saveNewlyCreatedEpics();
    } else if (
      this.isChangeDetectedInPreviouslyCreatedEpics() ||
      this.isNewEpicsCreated()
    ) {
      this.saveNewlyCreatedEpics();
      this.savePreviousEpicsIfEditted();
    }
  }
}

function removeUnnecessaryElements(elementsContainer: Array<any>) {
  return elementsContainer.filter(element => {
    return !(
      Object.keys(element).length === 0 && element.constructor === Object
    );
  });
}

function removeEmptyElements(elementsContainer: Array<any>) {
  return elementsContainer.filter((elem: any) => {
    return elem != null;
  });
}
