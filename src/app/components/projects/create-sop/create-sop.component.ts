import {
  Component,
  OnInit,
  Input,
  OnChanges,
  AfterViewInit,
  AfterContentInit,
  HostListener,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControlName,
  FormControl,
  Validators,
} from "@angular/forms";
import { slideDown, hideInOut } from "../../../animation";

import { AppcontrolService } from "../../../services/controlservice/appcontrol.service";
import { DataService } from "../../../data.service";
import { ContainerService } from "../container/container.service";
import { MatSnackBar } from "@angular/material";
import { CardService } from "../card/card.service";
import { ContainerComponent } from "../container/container.component";
import { NgxSpinnerService } from "ngx-spinner";
import { UtilsService } from "../../../utils.service";

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27,
  ENTER = 13,
}

interface AssignUser {
  user?: string;
  email?: string;
  role?: string;
  indecatedUserAboutMistakes?: boolean;
}

interface ProjectDetails {
  clientName: string;
  title: string;
  chargeCode: string;
  due_date: string;
  logo: any;
  rCodes: any;
}

@Component({
  selector: "app-create-sop",
  templateUrl: "./create-sop.component.html",
  styleUrls: ["./create-sop.component.scss"],
  animations: [slideDown, hideInOut],
})
export class CreateSopComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() cardID;
  @Input("permissions") permissions: any;
  @Output("close") close = new EventEmitter<boolean>();
  imagePath: string = "";
  userDatas;
  assigneeName: string = "";

  createSOP = "Create New Project";
  editSOP = "Edit Project";

  projectDetails: ProjectDetails = {
    clientName: "",
    title: "",
    chargeCode: "",
    due_date: "",
    logo: "",
    rCodes: "",
  };

  roles: string[] = ["SuperAdmin", "Manager", "Analyst"];
  disableSelect: boolean = false;
  /**
   * This variables are used while creating a new card
   */

  createAssignees = [];

  inviteEmail = "";
  inviteFirstName = "";
  inviteLastName = "";
  inviteRole = "";
  inviteMessage = "";

  /**
   * Validate SOP form
   */
  validateAutomationSystemName: boolean = false;
  validateClientName: boolean = false;
  validateChargeCode: boolean = false;
  validateSelectedDate: boolean = false;

  /**
   * Validate Invite New User Form
   */

  validateInviteEmail: boolean = false;
  validateFirstName: boolean = false;
  validateLastName: boolean = false;
  validateRole: boolean = false;

  selectedTabIndex: number = 0;
  invitationSuccess: boolean = false;

  /**
   * These variables are used to display messages using string interpolation technique
   * The "border" variable is used to change the border color of the due date box
   */
  validateClientNameMessage: string =
    "*Client name cannot be blank or contain numbers";
  validateAutomationSystemNameMessage: string =
    "*Automation system name cannot be blank";
  validateChargeCodeMessage: string =
    "*Please enter a valid charge code or due date";

  border = "1px solid #D1D1D1";

  users: string[] = ["SuperAdmin", "Manager", "Analyst"];
  user: string;

  /**
   * This variables are used while rearranging the date
   */
  editSelectedDate;

  options: AssignUser[] = [];

  ID;

  permissionGranted: any;
  newlyCreatedAssignees: any = [];
  createdAssignees: any = [];

  constructor(
    private _UIControllerService: AppcontrolService,
    private _dataService: DataService,
    private _ContainerService: ContainerService,
    private formBuilder: FormBuilder,
    private _cardService: CardService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private __containerComponent: ContainerComponent,
    private utils: UtilsService
  ) {}

  /**
   * Hide backdrop when escape is pressed
   * @param event
   */
  @HostListener("document:keyup.escape", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.onOverlayClose();
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

  ngOnInit() {}

  ngOnChanges() {}

  ngAfterViewInit() {}

  /**
   * Function to Search for name and add them to the assignee list
   * @param event
   */
  onKeyPress(event) {
    this._dataService
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
  onSelect(option: any) {
    const temporaryObject = {
      user: option.name ? option.name : option.email,
    };
    this.createdAssignees.unshift(temporaryObject);
    this.options = [];
  }

  /**
   * Close the overlay and reset all fields
   */
  onOverlayClose() {
    this.close.emit(false);
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
  onSelectionChange(value: string, index: number) {
    const temporaryObject = this.createdAssignees[index];
    temporaryObject.role = value;
    this.createdAssignees[index] = temporaryObject;
  }

  /**
   * To close the backdrop dialog-box
   */
  onClose() {
    this.imagePath = "";
    this.createAssignees = [];
    this.validateAutomationSystemName = false;
    this.validateClientName = false;
    this.validateChargeCode = false;
    this.validateSelectedDate = false;
    this.border = "1px solid #D1D1D1";
    this.assigneeName = "";
    this.filePreview = "";
    this.options = [];
    this.onOverlayClose();
  }

  filePreview;
  /**
   * To select and preview image for logo
   * @param fileSelected
   */
  onFileSelected(fileSelected) {
    if (fileSelected.target.files && fileSelected.target.files[0]) {
      this.projectDetails.logo = fileSelected.target.files[0];
      const reader: any = new FileReader();
      reader.readAsDataURL(fileSelected.target.files[0]);
      reader.onload = fileSelected => {
        this.filePreview = fileSelected.target.result;
      };
    }
  }

  /**
   * To remove an assignee from the 'Assign To' list
   * @param assigneeListItem
   */
  onRemove(id: number) {
    this.createdAssignees.splice(id, 1);
  }

  onDueDateChange($event: Date) {
    this.projectDetails.due_date = this.utils.datetypeToStringWithoutTime(
      $event
    );
  }

  /**
   * Create a new SOP on click
   */

  validateForm(object: ProjectDetails) {
    const validationStatus = [];

    for (const key in object) {
      if (key == "clientName") {
        object[key] != ""
          ? (this.validateClientName = validationStatus[0] = false)
          : (this.validateClientName = validationStatus[0] = true);
      }

      if (key == "title") {
        object[key] != ""
          ? (this.validateAutomationSystemName = validationStatus[1] = false)
          : (this.validateAutomationSystemName = validationStatus[1] = true);
      }

      if (key == "chargeCode") {
        object[key] != ""
          ? (this.validateChargeCode = validationStatus[2] = false)
          : (this.validateChargeCode = validationStatus[2] = true);
      }

      if (key == "due_date") {
        if (object[key] != "") {
          this.validateSelectedDate = validationStatus[3] = false;
          this.border = "1px solid #D1D1D1";
        } else {
          this.validateSelectedDate = validationStatus[3] = true;
          this.border = "1px solid rgb(245, 117, 117)";
        }
      }
    }

    if (validationStatus.indexOf(true) == -1) {
      return 0;
    }
    return -1;
  }

  /**
   *
   * @param list validation for creating assignees
   */
  resetValidation(list: Array<AssignUser>) {
    for (let i = 0; i < list.length; i++) {
      list[i].indecatedUserAboutMistakes = false;
    }
    return list;
  }

  validateAssigneeArrayList(list: Array<AssignUser>) {
    const validationFailed = [];
    for (let i = 0; i < list.length; i++) {
      if (!list[i].role) {
        validationFailed.push({
          status: false,
          index: i,
        });
      }
    }

    if (validationFailed.length) {
      return validationFailed;
    }
    return true;
  }

  indicateUserIfValidationWentWrong(validationStatus: any | boolean) {
    if (validationStatus == true) {
      return true;
    }
    validationStatus.forEach((ele: any, i: number) => {
      this.createdAssignees[ele.index].indecatedUserAboutMistakes = true;
    });

    return false;
  }

  onCreateNew() {
    const validationCheck = this.validateForm(this.projectDetails);
    const assigneeValidationStatus = this.indicateUserIfValidationWentWrong(
      this.validateAssigneeArrayList(
        this.resetValidation(this.createdAssignees)
      )
    );
    if (validationCheck == 0 && assigneeValidationStatus) {
      this.spinner.show();
      const formData = this.JSONtoFormData(this.projectDetails);
      let sopId: number;
      this._dataService.postData("/sop.json", formData).subscribe(
        //if response successfull
        response => {
          if (this.createdAssignees.length > 0) {
            this.createdAssignees.forEach((ele, index, array) => {
              delete ele.indecatedUserAboutMistakes;
              this._dataService
                .postData(`/sop/${response.id}/assignee.json`, ele)
                .subscribe(res => {});
            });
          }
        },
        //if response not successfull
        err => {
          this.spinner.hide();
        },
        () => {
          this.__containerComponent.getListOfAllProjects();
          this.snackBar.open("Project has been created", "Success", {
            duration: 2000,
          });
          this.spinner.hide();
          this.onOverlayClose();
        }
      );
    }
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
}
