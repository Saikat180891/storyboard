import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { NgxSpinnerService } from "ngx-spinner";
import { forkJoin, fromEvent, Observable } from "rxjs";
import { hideInOut, slideDown } from "../../../animation";
import { DataService } from "../../../data.service";
import { SharedService } from "../../../services/shared-services/shared.service";
import { DateUtils } from "../../shared/date-utils";
import { InviteUserFieldComponent } from "../invite-user-field/invite-user-field.component";
import { Assignee, userToAssigneeAdapter } from "../models/assignee.model";
import { KEY_CODE, Role } from "../models/enums";
import { InviteUser } from "../models/invite-user.model";
import { ServerPermission } from "../models/permissions.model";
import { Project, ProjectDisplay } from "../models/project.model";
import { User } from "../models/user.model";
import { ProjectsService } from "../projects.service";

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
  @Input("project") project: ProjectDisplay;
  @Input("projectRole") projectRole: Role;
  @Input("create") createMode: boolean;
  @Output("close") close = new EventEmitter<boolean>();

  newProjectHeaderText: string = "Create New Project";
  newProjectSubmitButtonText: string = "Create New";
  editProjectHeaderText: string = "Edit Project";
  editProjectSubmitButtonText: string = "Save";

  invitationList: InviteUser[] = [
    {
      email: "",
      role: "",
      firstName: "",
      lastName: "",
    },
  ];

  @ViewChildren("inviteUserToken") inviteUserFields: QueryList<
    InviteUserFieldComponent
  >;

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
  canChangeRole: boolean;
  assigneeIdsToRemove: number[] = [];
  alreadyCreatedAssignees: Assignee[] = [];
  editAssigneesArray: Assignee[] = [];
  newlyCreatedAssignees: Assignee[] = [];
  dueDate: Date;
  formValidationFailed: boolean;

  constructor(
    private dataService: DataService,
    private projectsService: ProjectsService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private sharedService: SharedService
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

    // format dates properly
    if (this.project.due_date !== "") {
      this.dueDate = DateUtils.arrangeDateInCorrectFormat(
        this.project.due_date
      );
      this.project.due_date = DateUtils.datetypeToStringWithoutTime(
        this.project.due_date
      );
    }

    fromEvent(document, "click").subscribe(res => {
      this.options = [];
    });

    // TODO this should actually pull from this.permissions
    // TODO: Manish: Need to refactor the entire permissions logic to a permission's service
    this.canRemoveAssignees =
      this.project && this.project.currentUserPermission
        ? this.project.currentUserPermission[ServerPermission.DELETE_ASSIGNEE]
        : false;
    this.canChangeRole =
      this.project && this.project.currentUserPermission
        ? this.project.currentUserPermission[ServerPermission.CHANGE_ASSIGNEE]
        : false;
  }

  setProject(): void {
    if (this.project) {
      this.project = { ...this.project }; // clone this.project
    } else {
      this.project = {
        id: -1,
        clientName: "",
        title: "",
        chargeCode: "",
        numberEpics: 0,
        logo: "",
        due_date: "",
        assignee: [],
      };
    }
    this.filePreview = this.project.logo;
    this.alreadyCreatedAssignees = this.project.assignee.concat(); // clone this.project.assignee
  }

  getHeaderText(): string {
    return this.createMode
      ? this.newProjectHeaderText
      : this.editProjectHeaderText;
  }

  getSubmitButtonText(): string {
    return this.createMode
      ? this.newProjectSubmitButtonText
      : this.editProjectSubmitButtonText;
  }

  ngOnChanges() {}

  ngAfterViewInit() {}

  /**
   * Function to Search for name and add them to the assignee list
   * @param event - KeyboardEvent
   */
  onKeyPress(event: any): void {
    // Must explicitly declare event as any to access target.value
    // TODO this API call and the component that calls this function should
    // be separated out
    const query = event.target.value.trim();
    if (query.length) {
      this.dataService.fetchData(`/users.json?startsWith=${query}`).subscribe(
        res => {
          this.options = res;
        },
        err => {
          this.options = [];
        }
      );
    } else {
      this.options = [];
    }
  }

  /**
   * Select a name on click and display it in the assignee to input box
   * @param option
   */
  onSelect(option: User): void {
    this.newlyCreatedAssignees.push(userToAssigneeAdapter(option));
    this.options = [];
  }

  /**
   * Prevent click bubbling to the parent element
   * @param clickEvent - capture click event
   */
  preventPropagation(clickEvent: Event): void {
    clickEvent.stopPropagation();
  }

  /**
   * runs when the user select the role select box;
   * @param value -- returns string Manager, SuperAdmin, Analyst
   * @param index -- returns index of the array
   */
  onSelectionChange(value: Role, index: number): void {
    this.newlyCreatedAssignees[index].role = value;
  }

  onTabChange($event): void {
    this.selectedTabIndex = $event.index;
  }

  onAddUser(): void {
    const emptyInvitee = {
      email: "",
      role: "",
      firstName: "",
      lastName: "",
    };
    this.invitationList.push(emptyInvitee);
  }

  /**
   * To close the backdrop dialog-box
   */
  onClose(): void {
    this.projectInfoValidators = this.defaultProjectInfoValidators;
    this.border = "1px solid #D1D1D1";
    this.filePreview = "";
    this.options = [];
    this.close.emit(false);
  }

  /**
   * To select and preview image for logo
   * @param fileSelected - a file select Event
   */
  onFileSelected(fileSelected: any): void {
    // explicit any typing required to access target.event
    const target = fileSelected.target;
    if (!(target.files || target.files[0])) {
      return;
    }

    const file = target.files[0];
    const allowedFileTypes = ["image/png", "image/jpeg"];
    if (!allowedFileTypes.includes(file.type)) {
      this.sharedService.raiseError(
        "Only JPEG and PNG image file formats are allowed."
      );
      return;
    }

    this.project.logo = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (fileSelected: any) => {
      // explicit any typing required to access target.event
      this.filePreview = fileSelected.target.result;
    };
  }

  onRemoveListItem(index: number): void {
    this.newlyCreatedAssignees.splice(index, 1);
  }

  /**
   * To remove an assignee from the 'Assign To' list
   * @param id
   */
  onRemove(id: number): void {
    this.assigneeIdsToRemove.push(id);
    const removeIndex = this.alreadyCreatedAssignees.findIndex(
      assignee => assignee.id === id
    );
    this.alreadyCreatedAssignees.splice(removeIndex, 1);
  }

  onRoleChange(role, i) {
    this.alreadyCreatedAssignees[i].role = role;
    this.editAssigneesArray.push(this.alreadyCreatedAssignees[i]);
  }

  onDueDateChange(date: Date): void {
    this.project.due_date = DateUtils.datetypeToStringWithoutTime(date);
    this.dueDate = date;
  }

  validateForm(project: Project): boolean {
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

  onCreateNew(): void {
    const validationCheck =
      this.validateForm(this.project) && this.validateAssignees();
    if (!validationCheck) {
      this.formValidationFailed = true;
      return;
    }
    this.spinner.show();
    const formData = this.getProjectFormData();
    // TODO logic in this nested call could be simplified + extracted into projects.service
    this.projectsService.createProject(formData).subscribe(
      response => {
        this.projectsService
          .createAssignee(response.id, this.newlyCreatedAssignees)
          .subscribe(() => {
            this.projectsService.setProjectPageNeedsRefresh(true);
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

  onSave(): void {
    this.spinner.show();

    const formData = this.getProjectFormData();
    if (typeof formData.get("logo") === "string") {
      formData.set("logo", "");
    }
    formData.set("rCodes", "");
    const deleteAssignee: Observable<any> = this.projectsService.deleteAssignee(
      this.project.id,
      this.assigneeIdsToRemove
    );
    const createAssignee: Observable<any> = this.projectsService.createAssignee(
      this.project.id,
      this.newlyCreatedAssignees
    );
    const updateProject: Observable<any> = this.projectsService.updateProject(
      this.project.id,
      formData
    );
    const updateRole: Observable<any> = this.projectsService.updateAssignee(
      this.project.id,
      this.editAssigneesArray
    );
    const forkJoinArray = [updateProject];

    if (this.assigneeIdsToRemove.length > 0) {
      forkJoinArray.push(deleteAssignee);
    }
    if (this.newlyCreatedAssignees.length > 0) {
      forkJoinArray.push(createAssignee);
    }
    if (this.editAssigneesArray.length > 0) {
      forkJoinArray.push(updateRole);
    }

    forkJoin(forkJoinArray).subscribe(
      ([]) => {},
      err => {
        this.spinner.hide();
        this.sharedService.raiseError(err);
      },
      () => {
        this.spinner.hide();
        this.onClose();
        this.snackBar.open("Project has been modified", "Success", {
          duration: 2000,
        });
        this.assigneeIdsToRemove = [];
        this.newlyCreatedAssignees = [];
        this.editAssigneesArray = [];
      }
    );
  }

  onSubmit(): void {
    this.createMode ? this.onCreateNew() : this.onSave();
  }

  getProjectFormData(): FormData {
    const formData = new FormData();
    for (const fieldValue in this.project) {
      formData.append(fieldValue, this.project[fieldValue]);
    }
    return formData;
  }

  onSendInvitation(): void {
    this.inviteUserFields.forEach(field => {
      field.setSubmitted();
      // If field is not valid, don't bother sending an API request
      if (!field.isValid()) {
        return;
      }
      const invitee: InviteUser = field.getData();
      this.projectsService.inviteUser(this.project.id, invitee).subscribe(
        res => {
          this.snackBar.open(
            `Invitation mail has been sent to ${invitee.email}`,
            "Success",
            { duration: 3000 }
          );
        },
        err => {
          this.sharedService.raiseError(err);
        }
      );
    });
  }
}
