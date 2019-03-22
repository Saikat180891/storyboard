import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";
import { fromEvent } from "rxjs";
import { hideInOut, slideDown } from "../../../animation";
import { DataService } from "../../../data.service";
import { UtilsService } from "../../../utils.service";
import { Assignee, userToAssigneeAdapter } from "../models/assignee.model";
import { KEY_CODE, Role } from "../models/enums";
import { Project } from "../models/project.model";
import { User } from "../models/user.model";

@Component({
  selector: "app-edit-project-dialog",
  templateUrl: "./edit-project-dialog.component.html",
  styleUrls: ["./edit-project-dialog.component.scss"],
  animations: [slideDown, hideInOut],
})
export class EditProjectDialogComponent
  implements OnInit, OnChanges, AfterViewInit {
  @Input() cardID;
  @Input("permissions") permissions: any;
  @Input("project") project: Project;
  @Input("projectRole") projectRole: Role;
  @Input("create") createMode: boolean;
  @Output("close") close = new EventEmitter<boolean>();

  dialogHeaderText: string = "";
  submitButtonText: string = "";

  newProjectHeaderText: string = "Create New Project";
  newProjectSubmitButtonText: string = "Create New";
  editProjectHeaderText: string = "Edit Project";
  editProjectSubmitButtonText: string = "Save";

  roles: Role[] = [Role.SUPER_ADMIN, Role.MANAGER, Role.ANALYST];

  invitationList = [
    {
      inviteEmail: "",
      inviteRole: "",
      inviteFirstName: "",
      inviteLastName: "",
    },
  ];

  /**
   * Validate SOP form
   */
  defaultProjectInfoValidators = {
    title: false,
    clientName: false,
    chargeCode: false,
    due_date: false,
  };
  projectInfoValidators = this.defaultProjectInfoValidators;

  selectedTabIndex: number = 0;
  filePreview: any;

  border = "1px solid #D1D1D1";

  /**
   * This variables are used while rearranging the date
   */
  editSelectedDate;

  options: User[] = [];

  ID;

  permissionGranted: any;
  canRemoveAssignees: boolean;
  assigneeIdsToRemove: number[] = [];
  alreadyCreatedAssignees: Assignee[] = [];
  newlyCreatedAssignees: Assignee[] = [];
  dueDate: Date;
  formValidationFailed: boolean;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private utils: UtilsService
  ) {}

  /**
   * Hide backdrop when escape is pressed
   * @param event
   */
  @HostListener("document:keyup.escape", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.onClose();
    }
  }
  /**
   * Create new Sop on enter press
   * @param event
   */
  @HostListener("document:keyup.enter", ["$event"])
  keyEventEnter(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ENTER) {
      this.onCreateNew();
    }
  }

  ngOnInit() {
    this.setProject();
    this.setDialogText();

    // format dates properly
    if (this.project.due_date !== "") {
      this.dueDate = this.utils.arrangeDateInCorrectFormat(
        this.project.due_date
      );
      this.project.due_date = this.utils.datetypeToStringWithoutTime(
        this.project.due_date
      );
    }

    fromEvent(document, "click").subscribe(res => {
      this.options = [];
    });

    // TODO this should actually pull from this.permissions
    this.canRemoveAssignees = this.projectRole === Role.SUPER_ADMIN;
  }

  setProject() {
    if (this.project) {
      this.project = { ...this.project }; // clone this.project
    } else {
      this.project = {
        id: -1,
        clientName: "",
        title: "",
        chargeCode: "",
        rCodes: "",
        logo: "",
        due_date: "",
        assignee: [],
      };
    }
    this.filePreview = this.project.logo;
    this.alreadyCreatedAssignees = this.project.assignee.concat(); // clone this.project.assignee
  }

  setDialogText() {
    // set dialog text + submit button text
    if (this.createMode) {
      this.dialogHeaderText = this.newProjectHeaderText;
      this.submitButtonText = this.newProjectSubmitButtonText;
    } else {
      this.dialogHeaderText = this.editProjectHeaderText;
      this.submitButtonText = this.editProjectSubmitButtonText;
    }
  }

  ngOnChanges() {}

  ngAfterViewInit() {}

  /**
   * Function to Search for name and add them to the assignee list
   * @param event
   */
  onKeyPress(event) {
    this.dataService
      .fetchData(`/users.json?startsWith=${event.target.value}`)
      .subscribe(
        res => {
          this.options = res;
        },
        err => {}
      );
  }

  /**
   * Select a name on click and display it in the assignee to input box
   * @param option
   */
  onSelect(option: User) {
    this.newlyCreatedAssignees.push(userToAssigneeAdapter(option));
    this.options = [];
  }

  /**
   * Prevent click bubbling to the parent element
   * @param clickEvent - capture click event
   */
  preventPropagation(clickEvent) {
    clickEvent.stopPropagation();
  }

  /**
   * runs when the user select the role select box;
   * @param value -- returns string Manager, SuperAdmin, Analyst
   * @param index -- returns index of the array
   */
  onSelectionChange(value: Role, index: number) {
    this.newlyCreatedAssignees[index].role = value;
  }

  onTabChange($event) {
    this.selectedTabIndex = $event.index;
  }

  onAddUser() {
    const emptyInvitee = {
      inviteEmail: "",
      inviteRole: "",
      inviteFirstName: "",
      inviteLastName: "",
    };
    this.invitationList.push(emptyInvitee);
  }

  /**
   * To close the backdrop dialog-box
   */
  onClose() {
    this.projectInfoValidators = this.defaultProjectInfoValidators;
    this.border = "1px solid #D1D1D1";
    this.filePreview = "";
    this.options = [];
    this.close.emit(false);
  }

  /**
   * To select and preview image for logo
   * @param fileSelected
   */
  onFileSelected(fileSelected: any) {
    // explicit any typing required to access target.event
    const target = fileSelected.target;
    if (!(target.files || target.files[0])) {
      return;
    }

    const file = target.files[0];
    this.project.logo = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (fileSelected: any) => {
      // explicit any typing required to access target.event
      this.filePreview = fileSelected.target.result;
    };
  }

  onRemoveListItem(index: number) {
    this.newlyCreatedAssignees.splice(index, 1);
  }

  /**
   * To remove an assignee from the 'Assign To' list
   * @param assigneeListItem
   */
  onRemove(id: number) {
    this.assigneeIdsToRemove.push(id);
    const removeIndex = this.alreadyCreatedAssignees.findIndex(
      assignee => assignee.id === id
    );
    this.alreadyCreatedAssignees.splice(removeIndex, 1);
  }

  removeAssignees() {
    this.assigneeIdsToRemove.forEach(id => {
      this.dataService.delete(`/sop/assignee`, `${id}.json`).subscribe();
    });
    this.assigneeIdsToRemove = [];
  }

  createAssignees() {
    this.newlyCreatedAssignees.forEach(assignee => {
      this.dataService
        .postData(`/sop/${this.project.id}/assignee.json`, {
          user: assignee.user,
          role: assignee.role,
        })
        .subscribe();
    });
    this.newlyCreatedAssignees = [];
  }

  onDueDateChange(date: Date) {
    this.project.due_date = this.utils.datetypeToStringWithoutTime(date);
    this.dueDate = date;
  }

  validateForm(project: Project) {
    for (const key in this.projectInfoValidators) {
      this.projectInfoValidators[key] = project[key] !== "";
    }
    this.border = this.projectInfoValidators["due_date"]
      ? "1px solid #D1D1D1"
      : "1px solid rgb(245, 117, 117)";
    return Object.values(this.projectInfoValidators).every(value => value);
  }

  validateAssignee(assignee: Assignee): boolean {
    return assignee.role !== null;
  }

  validateAssignees(): boolean {
    return this.alreadyCreatedAssignees.every(this.validateAssignee);
  }

  onCreateNew() {
    const validationCheck =
      this.validateForm(this.project) && this.validateAssignees();
    if (!validationCheck) {
      this.formValidationFailed = true;
      return;
    }
    this.spinner.show();
    const formData = this.JSONtoFormData(this.project);
    this.dataService.postData("/sop.json", formData).subscribe(
      response => {
        if (this.alreadyCreatedAssignees.length === 0) {
          return;
        }
        this.alreadyCreatedAssignees.forEach(assignee => {
          this.dataService
            .postData(`/sop/${response.id}/assignee.json`, assignee)
            .subscribe(res => {});
        });
      },
      err => {
        this.spinner.hide();
      },
      () => {
        this.snackBar.open("Project has been created", "Success", {
          duration: 2000,
        });
        this.spinner.hide();
        this.onClose();
      }
    );
  }

  onSave() {
    this.spinner.show();

    const formData = new FormData();
    for (const formFieldValue in this.project) {
      formData.append(formFieldValue, this.project[formFieldValue]);
    }
    if (typeof formData.get("logo") === "string") {
      formData.set("logo", "");
    }
    formData.set("rCodes", "");

    this.dataService
      .update("/sop", this.project.id + ".json", formData)
      .subscribe(
        response => {
          if (this.assigneeIdsToRemove.length > 0) {
            this.removeAssignees();
          }
          if (this.newlyCreatedAssignees.length > 0) {
            this.createAssignees();
          }
          this.snackBar.open("Project has been modified", "Success", {
            duration: 2000,
          });
        },
        err => {
          const keys = Object.keys(err.error);
          let error = "";
          keys.forEach(key => {
            error += key + ": " + err.error[key] + "\n";
          });
          this.spinner.hide();

          this.snackBar.open(error, "Failed", { duration: 2000 });
        },
        () => {
          this.onClose();
          this.spinner.hide();
        }
      );
  }

  onSubmit() {
    this.createMode ? this.onCreateNew() : this.onSave();
  }

  /**
   * Format the year as 00YY
   * @param year
   */
  formatYear(year) {
    const digits = year.toString().split("");
    return "" + digits[2] + digits[3];
  }

  /**
   * Get the date as a string and then split the string using
   * the "/" then using the date, month and year
   * set the due date in the editSelectedDate property
   * @param date
   */
  arrangeDateInCorrectFormat(date) {
    const newDate = date.toString().split("/");
    this.editSelectedDate = new Date();
    this.editSelectedDate.setFullYear(Number(newDate[2]));
    this.editSelectedDate.setMonth(Number(newDate[1]) - 1);
    this.editSelectedDate.setDate(Number(newDate[0]));
    return this.editSelectedDate;
  }

  JSONtoFormData(json) {
    const formData = new FormData();
    for (const fieldValue in json) {
      formData.append(fieldValue, json[fieldValue]);
    }
    return formData;
  }

  onSendInvitation() {
    this.invitationList.forEach(invitee => {
      this.dataService
        .postData("/invite_users/", {
          first_name: invitee.inviteFirstName,
          email: invitee.inviteEmail,
          last_name: invitee.inviteLastName,
          role: invitee.inviteRole,
          sop: this.project.id,
        })
        .subscribe(
          res => {
            this.snackBar.open(
              `Invitation mail has been sent to ${invitee.inviteEmail}`,
              "Success",
              { duration: 3000 }
            );
          },
          err => {
            this.snackBar.open(
              `Can not send invitation to ${invitee.inviteEmail}`,
              "Failed",
              { duration: 3000 }
            );
          }
        );
    });
  }
}
