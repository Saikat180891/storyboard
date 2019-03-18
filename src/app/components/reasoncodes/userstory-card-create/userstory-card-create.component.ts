import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
} from "@angular/core";
import { fromEvent } from "rxjs";
import { SharedServicesService } from "../../../services/shared-services/shared-services.service";
import { ReasonCodeService } from "../reason-code.service";
import { CreateUserstoryService } from "./create-userstory.service";

interface UserStory {
  us_number: string;
  us_name: string;
  priority: string;
  rules_approved?: boolean;
  verified_test_cases?: boolean;
  ftes?: any;
  dev_hrs?: any;
  notes: string;
  status: string;
  created?: string;
  sprint_name: string;
  planned_delivery?: any;
  revised_delivery?: any;
  rc_name: string;
}

@Component({
  selector: "app-userstory-card-create",
  templateUrl: "./userstory-card-create.component.html",
  styleUrls: ["./userstory-card-create.component.scss"],
})
export class UserstoryCardCreateComponent implements OnInit, OnChanges {
  @Output("close") close = new EventEmitter<boolean>();

  @Input("sprintOptions") sprintOptions;

  @Input("reasonCodeOptions") reasonCodeOptions;

  priorityOptions = [
    {
      status: "High",
      color: "#FF3B3B",
    },
    {
      status: "Medium",
      color: "#FF902E",
    },
    {
      status: "Low",
      color: "#FDD468",
    },
  ];
  statusOptions = [
    {
      status: "Backlog",
      color: "#2A7DE1",
    },
    {
      status: "Rules",
      color: "#F47074",
    },
    {
      status: "Development",
      color: "#69D100",
    },
    {
      status: "Intl Testing",
      color: "#0033A1",
    },
    {
      status: "Ext Testing",
      color: "#FDD468",
    },
    {
      status: "Done",
      color: "#40C0C4",
    },
  ];

  activateRevisedDelivery: boolean = false;
  userStoryNumberValidator: boolean = false;
  userStoryNameValidator: boolean = false;
  userStoryPriorityValidator: boolean = false;
  userStorySprintNameValidator: boolean = false;
  userStoryStatusValidator: boolean = false;
  userStoryDescValidator: boolean = false;
  userStoryReasonCodeValidator: boolean = false;
  userStoryDevHrsValidator: boolean = false;
  userStoryBenefitValidator: boolean = false;
  validationSuccessfull = [];
  edit: boolean = true;

  userStoryPayload: UserStory = {
    us_number: "",
    us_name: "",
    priority: "",
    rules_approved: false,
    verified_test_cases: false,
    ftes: "",
    dev_hrs: "",
    notes: "",
    status: "",
    sprint_name: "",
    // planned_delivery: '',
    // revised_delivery: '',
    rc_name: "",
  };
  productivity;

  constructor(
    private __rcService: ReasonCodeService,
    private __createUserStory: CreateUserstoryService,
    private __sharedService: SharedServicesService
  ) {}

  ngOnInit() {}

  @HostListener("document:keyup.escape", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === this.__sharedService.KEY_CODE.ESCAPE) {
      this.onClose();
    }
  }

  ngOnChanges() {
    this.productivity = (
      parseFloat(this.userStoryPayload.ftes) /
      parseFloat(this.userStoryPayload.dev_hrs)
    ).toFixed(2);
  }

  onClose() {
    this.close.emit(false);
  }

  onEdit() {
    this.edit = !this.edit;
  }

  onCreate() {
    console.log(this.userStoryPayload);

    if (this.userStoryPayload.us_number == "") {
      this.userStoryNumberValidator = true;
      this.validationSuccessfull[0] = 0;
    } else {
      this.userStoryNumberValidator = false;
      this.validationSuccessfull[0] = 1;
    }
    if (this.userStoryPayload.us_name === "") {
      this.userStoryNameValidator = true;
      this.validationSuccessfull[1] = 0;
    } else {
      this.userStoryNameValidator = false;
      this.validationSuccessfull[1] = 1;
    }
    if (this.userStoryPayload.priority == "") {
      this.userStoryPriorityValidator = true;
      this.validationSuccessfull[2] = 0;
    } else {
      this.userStoryPriorityValidator = false;
      this.validationSuccessfull[2] = 1;
    }
    if (this.userStoryPayload.sprint_name == "") {
      this.userStorySprintNameValidator = true;
      this.validationSuccessfull[3] = 0;
    } else {
      this.userStorySprintNameValidator = false;
      this.validationSuccessfull[3] = 1;
    }
    if (this.userStoryPayload.status === "") {
      this.userStoryStatusValidator = true;
      this.validationSuccessfull[4] = 0;
    } else {
      this.userStoryStatusValidator = false;
      this.validationSuccessfull[4] = 1;
    }
    if (this.userStoryPayload.rc_name == "") {
      this.userStoryReasonCodeValidator = true;
      this.validationSuccessfull[5] = 0;
    } else {
      this.userStoryReasonCodeValidator = false;
      this.validationSuccessfull[5] = 1;
    }
    let value = this.validationSuccessfull.reduce((acc, val) => {
      return acc + val;
    });
    const pattern = /^([0-9]*(\.)?)[0-9]*$/;
    if (
      this.userStoryPayload.ftes != null &&
      this.userStoryPayload.ftes != "-----" &&
      !pattern.test(this.userStoryPayload.ftes)
    ) {
      this.userStoryBenefitValidator = true;
    } else {
      this.userStoryBenefitValidator = false;
      value++;
    }
    if (
      this.userStoryPayload.dev_hrs != null &&
      this.userStoryPayload.dev_hrs != "-----" &&
      !pattern.test(this.userStoryPayload.dev_hrs)
    ) {
      this.userStoryDevHrsValidator = true;
    } else {
      this.userStoryDevHrsValidator = false;
      value++;
    }
    if (value === 8) {
      let id: number;
      this.__rcService.sprintConfig.forEach(element => {
        if (element.sprint_name == this.userStoryPayload.sprint_name) {
          id = element.id;
        }
      });
      this.userStoryPayload.dev_hrs = parseFloat(
        this.userStoryPayload.dev_hrs
      ).toFixed(1);
      this.userStoryPayload.ftes = parseFloat(
        this.userStoryPayload.ftes
      ).toFixed(1);
      if (
        this.userStoryPayload.ftes === "" ||
        this.userStoryPayload.ftes === null ||
        isNaN(parseFloat(this.userStoryPayload.ftes))
      ) {
        delete this.userStoryPayload.ftes;
      }
      if (
        this.userStoryPayload.dev_hrs === "" ||
        this.userStoryPayload.dev_hrs === null ||
        isNaN(parseFloat(this.userStoryPayload.dev_hrs))
      ) {
        delete this.userStoryPayload.dev_hrs;
      }

      let rc_id = 0;
      this.__rcService.reasonCodeData.forEach(element => {
        if (element.name === this.userStoryPayload.rc_name) {
          rc_id = element.id;
        }
      });
      if (isNaN(this.userStoryPayload.revised_delivery)) {
        this.userStoryPayload.revised_delivery = null;
      }
      this.__createUserStory.createUserStory(id, rc_id, this.userStoryPayload);
      this.close.emit(false);
    }
  }

  onUpdateProductivity() {
    this.productivity = (
      parseFloat(this.userStoryPayload.dev_hrs) /
      parseFloat(this.userStoryPayload.ftes)
    ).toFixed(1);
  }

  onSprintSelect($event) {
    this.userStoryPayload.sprint_name = $event.status;
    this.__rcService.sprintConfig.forEach(element => {
      if (element.sprint_name === this.userStoryPayload.sprint_name) {
        const date = new Date(
          JSON.parse(
            JSON.stringify(
              element.end_date
                .split("/")
                .reverse()
                .join("-")
            )
          )
        );
        this.userStoryPayload.planned_delivery = date;
      }
    });
  }

  onDatePickerClosePD($event) {
    this.userStoryPayload.planned_delivery = $event.value;
  }

  onDatePickerCloseRD($event) {
    this.userStoryPayload.revised_delivery = $event.value;
  }

  onRDChecked(value) {
    this.activateRevisedDelivery = value;
  }
}
