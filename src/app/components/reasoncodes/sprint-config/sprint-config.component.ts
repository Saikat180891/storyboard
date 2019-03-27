import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { fromEvent } from "rxjs";
import { SharedServicesService } from "../../../services/shared-services/shared-services.service";
import { ReasonCodeService } from "../reason-code.service";

interface SprintConfig {
  duration: string;
  end_date: string;
  sprint_name: string;
  start_date: string;
}

interface ReasonCode {
  id?: number;
  name: string;
}

@Component({
  selector: "sprint-config",
  templateUrl: "./sprint-config.component.html",
  styleUrls: ["./sprint-config.component.scss"],
})
export class SprintConfigComponent
  implements OnInit, AfterViewChecked, OnChanges {
  @ViewChild("sprintContainer") sprintContainer: ElementRef;
  @ViewChild("rcContainer") rcContainer: ElementRef;

  @Output("closeSprints") closeSprints = new EventEmitter<boolean>();

  /**
   * sprintConfigData contains an array of objects which is aquired from the backend to
   * display the number of sprints
   */
  @Input("sprintConfigData") sprintConfigData;

  /**
   * reasonCodeConfigData contains an array of objects which is aquired from the backend to
   * display the number of reason-codes / epics
   */
  @Input("reasonCodeConfigData") reasonCodeConfigData;

  /**
   * this is a dynamic variable where array elements are created by user interaction
   * when the user clicks on the ssave all button all the elements in the array list
   * is sent to the backend one by one
   */
  addNewRow: SprintConfig[] = [];

  /**
   * same as addNewRow, but this is used for creating epics
   */
  addNewRowForReasonCode: ReasonCode[] = [];

  /**
   * a flag to display show the warning depending on the user behaviour
   */
  displayWarningBox: boolean = false;

  sprintToDeleteId: number;

  sprintNameToDelete: string = "";

  cancel: boolean = false;

  warning: boolean = false;

  warningBoxForCancel: boolean = false;

  reasonCodeEditChangeDetector = [];

  validateCheckBox: boolean = false;

  validateFileExtension: boolean = false;

  file_name: string = "";

  role: string;
  permissions: any;

  uploadForm = this.formBuilder.group({
    upload_file: ["", Validators.required],
    confirm_template_checkbox: false,
  });

  excelFile = new FormData();
  //this variable is used to detect if there is any change in the 'sprintConfigData' array
  changedDetected: boolean[] = [];

  constructor(
    private __rcService: ReasonCodeService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private __sharedService: SharedServicesService
  ) {}

  @HostListener("document:keyup.escape", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.__sharedService.KEY_CODE.ESCAPE) {
      this.closeSprints.emit(false);
    }
  }

  ngOnInit() {}

  ngOnChanges() {
    this.role = this.__rcService.role;
    this.permissions = this.__rcService.grantedPermission;
  }

  ngAfterViewChecked() {}

  onClose() {
    this.cancel = true;
    if (this.changedDetected.length > 0 || this.addNewRow.length > 0) {
      this.warningBoxForCancel = true;
    } else {
      this.addNewRow = [];
      this.changedDetected = [];
      this.closeSprints.emit(false);
    }
    this.__rcService.refresh(this.__rcService.sopId);
  }

  closeAll() {
    this.closeSprints.emit(false);
  }

  onSelectYes() {
    this.addNewRow = [];
    this.changedDetected = [];
    this.warningBoxForCancel = false;
    this.closeSprints.emit(false);
  }

  onAddSprints(element) {
    const temObj = {
      duration: "",
      end_date: "",
      sprint_name: "Sprint X",
      start_date: "",
    };
    this.addNewRow.push(temObj);
  }

  onSaveAllChanges() {
    this.saveSprint();
    this.saveEpics();
  }

  saveSprint() {
    this.spinner.show();
    if (this.addNewRow.length > 0) {
      this.__rcService.createSprint(this.addNewRow);
      this.__rcService.refresh(this.__rcService.sopId);
    }
    if (this.changedDetected) {
      this.changedDetected.forEach((element, index) => {
        if (element) {
          this.__rcService.editSprint(
            this.sprintConfigData[index].id,
            this.sprintConfigData[index]
          );
        }
      });
      this.__rcService.refresh(this.__rcService.sopId);
    }
    this.spinner.hide();
    this.onSelectYes();
  }

  deleteSprint(id, sprintName) {
    this.sprintToDeleteId = id;
    this.sprintNameToDelete = sprintName;
    this.displayWarningBox = true;
  }

  onDoNotDelete() {
    this.displayWarningBox = false;
    this.__rcService.refresh(this.__rcService.sopId);
  }

  onDelete() {
    this.__rcService.deleteSprint(this.sprintToDeleteId);
    this.displayWarningBox = false;
  }

  onDeleteRow(selected) {
    this.addNewRow.splice(selected, 1);
    this.dateCounter = 0;
  }

  onAddRC() {
    const temObj = {
      name: "Epic X",
    };
    this.addNewRowForReasonCode.push(temObj);
  }

  saveEpics() {
    if (this.reasonCodeEditChangeDetector.length > 0) {
      this.reasonCodeEditChangeDetector.forEach((element, index) => {
        if (element) {
          this.__rcService.editReasonCode(
            this.reasonCodeConfigData[index].id,
            this.reasonCodeConfigData[index]
          );
          this.__rcService.refresh(this.__rcService.sopId);
        }
      });
    } else if (this.addNewRowForReasonCode.length > 0) {
      this.addNewRowForReasonCode.forEach((element, index) => {
        if (element.name === "") {
          const pos = this.addNewRowForReasonCode.indexOf(element);
          this.addNewRowForReasonCode.splice(pos, 1);
        }
      });
      this.__rcService.createReasonCode(
        this.__rcService.sopId,
        this.addNewRowForReasonCode
      );
      this.__rcService.refresh(this.__rcService.sopId);
    } else if (
      this.reasonCodeEditChangeDetector.length > 0 ||
      this.addNewRowForReasonCode.length > 0
    ) {
      this.addNewRowForReasonCode.forEach((element, index) => {
        if (element.name === "") {
          const pos = this.addNewRowForReasonCode.indexOf(element);
          this.addNewRowForReasonCode.splice(pos, 1);
        }
        this.__rcService.createReasonCode(
          this.__rcService.sopId,
          this.addNewRowForReasonCode
        );
        this.__rcService.refresh(this.__rcService.sopId);
      });
      this.reasonCodeEditChangeDetector.forEach((element, index) => {
        if (element) {
          this.__rcService.editReasonCode(
            this.reasonCodeConfigData[index].id,
            this.reasonCodeConfigData[index]
          );
          this.__rcService.refresh(this.__rcService.sopId);
        }
      });
    }
    this.addNewRowForReasonCode = [];
    this.reasonCodeEditChangeDetector = [];
    this.closeSprints.emit(false);
  }

  onDeleteRC(selected) {
    this.addNewRowForReasonCode.splice(selected, 1);
  }

  onReasonCodeEdit(index) {
    this.reasonCodeEditChangeDetector[index] = true;
  }

  onDeleteCreatedRC(id, index) {
    this.__rcService.deleteReasonCode(id);
    this.__rcService.refresh(this.__rcService.sopId);
  }

  onDateSelected($event) {}

  createEndDate(startDate, index, operation, weeks) {
    const someDate = startDate;
    switch (operation) {
      case "add":
        someDate.setDate(someDate.getDate() + weeks * 7 - 1);
        break;
      case "substract":
        if (weeks === 0) {
          someDate.setDate(someDate.getDate() + weeks * 7);
        } else {
          someDate.setDate(someDate.getDate() + weeks * 7 - 1);
        }
        break;
      default:
        break;
    }
    const dd = someDate.getDate();
    const mm = someDate.getMonth() + 1;
    const y = someDate.getFullYear();
    this.addNewRow[index].end_date = mm + "/" + dd + "/" + y;
  }

  dateCounter: number = 0;
  lastIndex: number = -1;

  onArrowUp(index) {
    if (this.lastIndex != index) {
      this.dateCounter = 0;
      this.lastIndex = index;
    }

    if (this.addNewRow[index].duration) {
      const durationSplitted = this.addNewRow[index].duration.split("");
      const period = durationSplitted.pop();
      const weeks = durationSplitted.join("");
      this.dateCounter = parseInt(weeks);
      this.addNewRow[index].duration = (this.dateCounter += 1) + "W";
    } else if (this.addNewRow[index].start_date) {
      this.addNewRow[index].duration = (this.dateCounter += 1) + "W";
    }

    if (this.addNewRow[index].start_date) {
      const startDate = new Date(
        JSON.parse(JSON.stringify(this.addNewRow[index])).start_date
      );
      this.createEndDate(startDate, index, "add", this.dateCounter);
      this.warning = false;
    } else {
      this.warning = true;
    }
  }

  onArrowDown(index) {
    if (this.lastIndex != index) {
      this.dateCounter = 0;
      this.lastIndex = index;
    }

    if (this.addNewRow[index].duration) {
      const durationSplitted = this.addNewRow[index].duration.split("");
      const period = durationSplitted.pop();
      const weeks = durationSplitted.join("");
      this.dateCounter = parseInt(weeks);
      if (this.dateCounter < 1) {
        this.dateCounter = 0;
      } else {
        this.addNewRow[index].duration = (this.dateCounter -= 1) + "W";
      }
    } else if (this.addNewRow[index].start_date) {
      this.addNewRow[index].duration =
        (this.dateCounter == 0
          ? (this.dateCounter = 0)
          : (this.dateCounter -= 1)) + "W";
    }

    if (this.addNewRow[index].start_date) {
      const startDate = new Date(
        JSON.parse(JSON.stringify(this.addNewRow[index])).start_date
      );
      this.createEndDate(startDate, index, "substract", this.dateCounter);
      this.warning = false;
    } else {
      this.warning = true;
    }
  }
  /**
   * Change the end date if there is a change in the start date
   * @param $event
   * @param index
   */
  onDatePickerClose($event, index) {
    this.sprintConfigData[index].start_date = $event.value;
    const date = new Date(JSON.parse(JSON.stringify($event.value)));
    let weeks = this.sprintConfigData[index].duration.split("");
    const period = weeks.pop();
    weeks = weeks.join("");
    const days = parseInt(weeks) * 7;
    const newDate = new Date(date.setDate(date.getDate() + days));
    const dd = newDate.getDate();
    const mm = newDate.getMonth() + 1;
    const y = newDate.getFullYear();
    this.sprintConfigData[index].end_date = mm + "/" + dd + "/" + y;
    this.changedDetected[index] = true;
  }

  onUpdateSprint(index) {
    this.changedDetected[index] = true;
  }

  updateEndDate(startDate, index, operation, weeks) {
    const someDate = startDate;
    switch (operation) {
      case "add":
        someDate.setDate(someDate.getDate() + weeks * 7 - 1);
        break;
      case "substract":
        if (weeks === 0) {
          someDate.setDate(someDate.getDate() + weeks * 7);
        } else {
          someDate.setDate(someDate.getDate() + weeks * 7 - 1);
        }
        break;
      default:
        break;
    }
    const dd = someDate.getDate();
    const mm = someDate.getMonth() + 1;
    const y = someDate.getFullYear();
    this.sprintConfigData[index].end_date = mm + "/" + dd + "/" + y;
  }

  weekCounter: number = 0;

  onArrowUpforAlreadyCreated(index) {
    let durationSplitted = this.sprintConfigData[index].duration.split("");
    const period = durationSplitted.pop();
    durationSplitted = durationSplitted.join("");
    this.weekCounter = parseInt(durationSplitted);

    this.sprintConfigData[index].duration = (this.weekCounter += 1) + "W";
    const startDate = new Date(
      JSON.parse(JSON.stringify(this.sprintConfigData[index])).start_date
    );
    this.updateEndDate(startDate, index, "add", this.weekCounter);
    this.changedDetected[index] = true;
  }

  onArrowDownforAlreadyCreated(index) {
    let durationSplitted = this.sprintConfigData[index].duration.split("");
    const period = durationSplitted.pop();
    durationSplitted = durationSplitted.join("");
    this.weekCounter = parseInt(durationSplitted);
    if (this.weekCounter < 1) {
      this.weekCounter = 0;
    } else {
      this.sprintConfigData[index].duration = (this.weekCounter -= 1) + "W";
      const startDate = new Date(
        JSON.parse(JSON.stringify(this.sprintConfigData[index])).start_date
      );
      this.updateEndDate(startDate, index, "substract", this.weekCounter);
    }
    this.changedDetected[index] = true;
  }

  onFileSelected(fileSelected) {
    if (fileSelected.target.files && fileSelected.target.files[0]) {
      this.uploadForm.value.upload_file = fileSelected.target.files[0];
      this.excelFile.append("File", fileSelected.target.files[0]);
      this.file_name = fileSelected.target.files[0].name;
    }
  }

  validateFile(file) {
    let file_extension = "";
    if (file) {
      file_extension = file.name.split(".").pop();
    }
    if (file_extension == "xlsx") {
      this.validateFileExtension = false;
      return true;
    }
    this.validateFileExtension = true;
    return false;
  }

  validateUploadForm() {
    if (this.uploadForm.value["confirm_template_checkbox"]) {
      this.validateCheckBox = false;
      return this.validateFile(this.uploadForm.value["upload_file"]);
    }
    this.validateCheckBox = true;

    return false;
  }

  onUpload() {
    const validation = this.validateUploadForm();
    let message: string = "";
    let status: string = "";
    if (validation) {
      this.spinner.show();
      this.__rcService.importStories(this.excelFile).subscribe(
        res => {
          status = res["status"];
          message = res["message"];
        },
        err => {
          this.spinner.hide();
          status = err["status"];
          message = err["message"];
          this.__rcService.snackbar.open(
            "Please check the template and try again",
            "Fail",
            { duration: 5000 }
          );
          this.spinner.hide();
          this.onClose();
        },
        () => {
          this.spinner.hide();
          this.onClose();
          if (status == "Success") {
            this.__rcService.snackbar.open(
              "Your sprints, epics and stories are now available on the dashboard",
              status,
              { duration: 5000 }
            );
          } else if (status == "Failure") {
            this.__rcService.snackbar.open(message, status, { duration: 5000 });
          } else {
            this.__rcService.snackbar.open(
              "Please check the template and try again",
              "Fail",
              { duration: 5000 }
            );
          }
          this.__rcService.refresh(this.__rcService.sopId);
        }
      );
    }
  }

  oncheckBoxChange(value) {
    this.uploadForm.value["confirm_template_checkbox"] = value;
  }

  exportToExcel() {
    this.__rcService.downloadFile();
  }

  downloadProject = () => {
    this.__rcService.downloadProject();
  };
}
