import { HttpErrorResponse } from "@angular/common/http";
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from "@angular/material";
import { SharedService } from "src/app/services/shared-services/shared.service";
import { AutocompleteOption } from "../../shared/autocomplete/AutocompleteOption.model";
import { ConfirmModalService } from "../../shared/confirm-modal/confirm-modal.service";
import {
  arrangeEndDateForBackend,
  convertStartDateforBackend,
} from "../../shared/date-utils";
import { DropdownOptions } from "../../shared/dropdown/dropdown.component";
import { Epics } from "../models/Epics.model";
import { SprintBackend } from "../models/Sprint.model";
import { ServerUserstory, Userstory } from "../models/Userstory.model";
import { ApiService } from "../services/api.service";
import { UserstoryModalName } from "./modaltype.enum";

export interface DialogboxData {
  projectId: number;
  modalName: string;
  epics: Epics[];
  sprints: SprintBackend[];
  userStoryData: ServerUserstory;
}

@Component({
  selector: "app-userstory-create-edit-modal",
  templateUrl: "./userstory-create-edit-modal.component.html",
  styleUrls: ["./userstory-create-edit-modal.component.scss"],
})
export class UserstoryCreateEditModalComponent implements OnInit {
  @Output("close") close = new EventEmitter<boolean>();
  @Output("userstoryChange") userstoryChange = new EventEmitter();
  @Input("prePopulateData") prePopulateData: any;

  priorityOptions: DropdownOptions[] = [
    {
      label: "High",
      value: "High",
    },
    {
      label: "Medium",
      value: "Medium",
    },
    {
      label: "Low",
      value: "Low",
    },
  ];
  statusOptions: DropdownOptions[] = [
    {
      label: "Backlog",
      value: "Backlog",
    },
    {
      label: "Rules",
      value: "Rules",
    },
    {
      label: "Development",
      value: "Development",
    },
    {
      label: "Internal Testing",
      value: "Intl Testing",
    },
    {
      label: "External Testing",
      value: "Ext Testing",
    },
    {
      label: "Done",
      value: "Done",
    },
  ];
  sprints: DropdownOptions[] = [];
  epics: DropdownOptions[] = [];
  productivity: string;
  assigneeList: AutocompleteOption[] = [];
  inputViewLabel: string = "";
  userstoryForm: FormGroup = new FormGroup({
    userstoryNumber: new FormControl("", [
      Validators.required,
      Validators.maxLength(5),
    ]),
    userstoryName: new FormControl("", [
      Validators.required,
      Validators.maxLength(100),
    ]),
    epic: new FormControl("", Validators.required),
    sprint: new FormControl("", Validators.required),
    priority: new FormControl(""),
    devHrs: new FormControl(0),
    benefits: new FormControl(0),
    productivity: new FormControl(""),
    rulesApproved: new FormControl(false),
    verifiedTestCases: new FormControl(false),
    status: new FormControl("", Validators.required),
    description: new FormControl(""),
    plannedDelivery: new FormControl(""),
    assignee: new FormControl(""),
  });

  constructor(
    public dialogRef: MatDialogRef<UserstoryCreateEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogboxData,
    private confirmService: ConfirmModalService,
    private api: ApiService,
    private snackbar: MatSnackBar,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.sprints = this.getSprintsForDropdown(this.data.sprints);
    this.epics = this.getEpicsForDropdown(this.data.epics);
    if (this.data.modalName === UserstoryModalName.EDIT) {
      this.prepopulatedFormInEditMode(this.data.userStoryData);
      this.inputViewLabel =
        this.data.userStoryData && this.data.userStoryData.assignee_name
          ? this.data.userStoryData.assignee_name
          : "";
    }
  }

  prepopulatedFormInEditMode(userstory: ServerUserstory) {
    this.userstoryForm.setValue({
      userstoryNumber: userstory.us_number,
      userstoryName: userstory.us_name,
      epic: userstory.rc_id,
      sprint: userstory.sprint_id,
      priority: userstory.priority,
      devHrs: userstory.dev_hrs,
      benefits: userstory.ftes,
      rulesApproved: userstory.rules_approved,
      verifiedTestCases: userstory.verified_test_cases,
      status: userstory.status,
      description: userstory.notes,
      plannedDelivery: new Date(
        arrangeEndDateForBackend(userstory.planned_delivery)
      ),
      productivity: userstory.productivity,
      assignee: userstory.assignee_id,
    });
  }

  onSave(): void {
    if (this.userstoryForm.valid) {
      switch (this.data.modalName) {
        case UserstoryModalName.CREATE:
          this.api
            .createUserstory(
              this.data.projectId,
              this.userstoryForm.value.sprint,
              this.userstoryForm.value.epic,
              this.userstoryForm.value.assignee,
              this.createPayloadForBackend()
            )
            .subscribe(
              res => {
                this.onNoClick(res);
                this.snackbar.open(
                  "Userstory has been created successfully",
                  "Success",
                  { duration: 3000 }
                );
              },
              (err: HttpErrorResponse) => {
                this.sharedService.raiseError(err);
              }
            );
          break;
        case UserstoryModalName.EDIT:
          this.api
            .editUserstory(
              this.data.userStoryData.id,
              this.userstoryForm.value.sprint,
              this.userstoryForm.value.epic,
              this.userstoryForm.value.assignee,
              this.createPayloadForBackend()
            )
            .subscribe(
              res => {
                this.onNoClick();
                this.snackbar.open(
                  "Userstory has been updated successfully",
                  "Success",
                  { duration: 3000 }
                );
              },
              (err: HttpErrorResponse) => {
                this.sharedService.raiseError(err);
              }
            );
          break;
      }
    }
  }

  createPayloadForBackend(): ServerUserstory {
    const payload: Userstory = { ...this.userstoryForm.value };
    const mapFieldsForBackend: ServerUserstory = {
      dev_hrs: payload.devHrs,
      ftes: payload.benefits,
      notes: payload.description,
      priority: payload.priority,
      rules_approved: payload.rulesApproved,
      verified_test_cases: payload.verifiedTestCases,
      status: payload.status,
      us_name: payload.userstoryName,
      us_number: payload.userstoryNumber,
      planned_delivery: convertStartDateforBackend(payload.plannedDelivery),
    };
    return mapFieldsForBackend;
  }

  onCalculateProductivity(): void {
    this.productivity = (
      parseFloat(this.userstoryForm.value.benefits) /
      parseFloat(this.userstoryForm.value.devHrs)
    ).toFixed(1);
  }

  onInputChange($event: string): void {
    this.api
      .getAssigneeList(this.data.projectId, $event)
      .subscribe(assignees => (this.assigneeList = assignees));
  }

  onDoneSelected($event: DropdownOptions): void {
    if ($event.value === "Done") {
      this.confirmService.confirmDelete(
        'Are you sure you want to move it to "Completed"?',
        () => {},
        () => {
          this.userstoryForm.patchValue({
            status: "",
          });
        }
      );
    }
  }

  onSprintChange(sprintId: number): void {
    this.userstoryForm.patchValue({
      plannedDelivery: new Date(
        this.getSprintById(this.userstoryForm.get("sprint").value).end_date
      ),
    });
  }

  onNoClick(modifiedData?: any): void {
    this.dialogRef.close(modifiedData);
  }

  getSprintById(id: number): SprintBackend {
    return this.data.sprints.find((sprint: SprintBackend) => sprint.id === id);
  }

  getEpicNameById(id: number): Epics {
    return this.data.epics.find((epic: Epics) => epic.id === id);
  }

  getSprintsForDropdown(sprints: SprintBackend[] = []): DropdownOptions[] {
    return sprints.map(sprint => {
      return {
        label: sprint.sprint_name,
        value: sprint.id,
      };
    });
  }

  getEpicsForDropdown(epics: Epics[] = []): DropdownOptions[] {
    return epics.map(epic => {
      return {
        label: epic.name,
        value: epic.id,
      };
    });
  }
}
