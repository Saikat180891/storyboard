import { Injectable } from "@angular/core";
import { DataService } from "../../../data.service";
import { ReasonCodeService } from "../../reasoncodes/reason-code.service";
import { MatSnackBar } from "@angular/material";
// import {ReasoncodesComponent} from '../reasoncodes.component';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root",
})
export class EditUserStoryService {
  selected: number = -1;
  closeSpinner: boolean = false;

  constructor(
    private _api: DataService,
    private _rcService: ReasonCodeService,
    private snackBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}

  refreshPage() {
    this._rcService.getProjectStatusChartData(this._rcService.sopId);
    this._rcService.getChartData(this._rcService.sopId);
    this._rcService.getUserStories(this._rcService.sopId);
    this._rcService.getCompletedUserStories(this._rcService.sopId);
    this._rcService.getBenefits(this._rcService.sopId);
    this._rcService.getProjectStatus(this._rcService.sopId);
    this._rcService.getSprintStatus(this._rcService.sopId);
    this._rcService.getCurrentSprintData(this._rcService.sopId);
  }

  editUserStory(usID, sprintID, reasonCodeId, payload) {
    this.spinner.show();
    payload["dev_hrs"] == "-----"
      ? delete payload["dev_hrs"]
      : payload["dev_hrs"];
    if (sprintID) {
    } else {
      sprintID = 0;
    }
    if (reasonCodeId) {
    } else {
      reasonCodeId = 0;
    }
    const api = `/sop/reasoncode/userstories/${usID}/update/${sprintID}.json`;
    this._api
      .update(
        `/sop/epics/userstories/${usID}/update`,
        `${sprintID}/${reasonCodeId}.json`,
        payload
      )
      .subscribe(
        response => {
          this._rcService.userStories.forEach(element => {
            if (element.id === usID) {
              const pos = this._rcService.userStories.indexOf(element);
              this._rcService.userStories[pos] = response;
            }
          });
          this.refreshPage();
        },
        error => {
          this.refreshPage();
          this.snackBar.open(
            "Please check if there is an Unassigned field",
            "Error",
            { duration: 5000 }
          );
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
  }
}
