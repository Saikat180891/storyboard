import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { saveAs } from "file-saver";
import { NgxSpinnerService } from "ngx-spinner";
import { fromEvent } from "rxjs";
import { environment } from "../../../environments/environment";
import { hideInOut } from "../../animation";
import { DataService } from "../../data.service";
import { ScrollbarService } from "../../services/scrollbarService/scrollbar.service";
import { ProjectsService } from "../projects/projects.service";
import { charts } from "./chartoptions";
import {
  Audit,
  DownloadAuditType,
} from "./export-dialog-box/export-dialog-box.component";
import { Export } from "./export-sop-as-word/export-sop-as-word.component";
import { createDownloadableEpicsAndUserstories } from "./export-sop-as-word/export-sop-as-word.helpers";
import { DownloadFileType } from "./export-to-word-modal/export-to-word-modal.component";
import { ExportToWordModalService } from "./export-to-word-modal/export-to-word-modal.service";
import { ReasonCodeService } from "./reason-code.service";
import { ApiService } from "./services/api.service";
import { CreateUserstoryService } from "./userstory-card-create/create-userstory.service";
import { UserstoryControls } from "./userstory-menu-bar/userstory-menu-bar.component";
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
export interface Userstories {
  id: number;
  sprint: number;
  us: number;
  uname: string;
  priority: string;
  rules: string;
  verified: string;
  fte: number;
  devhrs: number;
  notes: string;
  status: string;
  btn: string;
}

export interface SprintConfig {
  sprint_name: string;
  start_date: string;
  duration: string;
  end_date: string;
}

export interface ReceivedSprintConfig {
  id: number;
  sprint_name: string;
  start_date: string;
  duration: string;
  end_date: string;
}

@Component({
  selector: "app-reasoncodes",
  templateUrl: "./reasoncodes.component.html",
  styleUrls: [
    "./reasoncodes.component.scss",
    "./completed-warning.scss",
    "./export.scss",
  ],
  animations: [hideInOut],
})
export class ReasoncodesComponent implements OnInit, OnDestroy {
  @ViewChild("totalPage") totalPage: ElementRef;
  @ViewChild("userStoryContainer") userStoryContainer: ElementRef;
  openAddSprint: boolean = false;
  panelOpenState = false;
  options = [1, 2, 3];
  pieChartOptions = {};
  barChartOptions = {};
  sopId: number;
  dateCounter: number = 0;
  userStories = [];
  openEditSideBar: boolean = false; // toggler to open or close the right side bar to edit
  openCreateSideBar: boolean = false; // toggler to open or close the right side bar to create
  sprintOptions = [];
  reasonCodeOptions = [];
  fixToTop: boolean = false;
  filter: boolean = false;
  sortBy: boolean = false;
  warning: boolean = false;
  warningToDeleteUserStory: boolean = false;
  clearAllFilter: boolean = true;
  openExport: boolean = false;
  showBenefitsChart: boolean = false;
  rippleColor = "rbga(0,0,0,0.2)";
  selectedTabIndex: number = 0;
  activateStickybar: boolean = false;
  activateVirtualFilter: boolean = false;
  role: string;
  permissions: any;
  enableView: boolean = true;
  currentProjectTitle: any;
  selectedTab: number = 0;

  addSprintPayload: SprintConfig = {
    sprint_name: "",
    start_date: "",
    duration: "",
    end_date: "",
  };

  validateSprintConfig = {
    start_date: true,
    duration: true,
    end_date: true,
  };

  currentSprintData;

  currentProject;

  receivedSprintConfig: ReceivedSprintConfig;

  addSprint = [this.addSprintPayload];

  constructor(
    private route: ActivatedRoute,
    private _reasonCode: ReasonCodeService,
    private _projectsService: ProjectsService,
    private _createUserStory: CreateUserstoryService,
    public spinner: NgxSpinnerService,
    private __api: DataService,
    private __scrollbar: ScrollbarService,
    private exportToModal: ExportToWordModalService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.route.params.subscribe(params => {
      this._reasonCode.sopId = this._createUserStory.sopId = parseInt(
        params.id
      );
      this.getPermissionForEpicsPage(2, this._reasonCode.sopId);
      this._projectsService.cardContents.forEach(element => {
        if (element.id == this._reasonCode.sopId) {
          this.currentProject = element;
        }
      });
    });

    /**
     * assign chart options
     */
    this.pieChartOptions = charts.pieChart;
    this.barChartOptions = charts.barChart;
  }

  onControlChange(controlSelected: number): void {
    switch (controlSelected) {
      case UserstoryControls.SORT:
        this.sortBy = !this.sortBy;
        return;
      case UserstoryControls.FILTER:
        this.filter = !this.filter;
        return;
      case UserstoryControls.CREATEUS:
        this.openCreateSideBar = !this.openCreateSideBar;
        this.createOptionsWithSprintName();
        return;
    }
  }

  ngOnDestroy() {
    this._reasonCode.destroyAllService();
  }

  getPermissionForEpicsPage(pageNumber: number, projectId: number) {
    this._reasonCode.getPermission(pageNumber, projectId).subscribe(
      res => {
        this._reasonCode.role = this.role = res[0].name;
        this._reasonCode.grantedPermission = this.permissions =
          res[0].permissions;
        if ("Can add user stories" in this.permissions) {
          this.enableView = this.permissions["Can add user stories"];
        }
      },
      err => {},
      () => {
        this._reasonCode.refresh(this._reasonCode.sopId);
      }
    );
  }

  getChart() {
    this._reasonCode.getChartData(35);
  }

  onCloseBenefits() {
    this.showBenefitsChart = false;
  }

  benefitChartImage: string;

  onShowBenefits(event) {
    this.benefitChartImage = `${this.__api.apiUrl}/sop/epics/charts/${
      this._reasonCode.sopId
    }/benefits_realization.png?q=${new Date().getTime()}`;
    this.showBenefitsChart = true;
  }

  clearAllSort() {
    this._reasonCode.getUserStories(this._reasonCode.sopId);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onOpenAddSprint() {
    this._reasonCode.getSprint(this._reasonCode.sopId);
    this._reasonCode.getReasonCode(this._reasonCode.sopId);
    const sprints = this._reasonCode.sprintConfig;
    this.openAddSprint = !this.openAddSprint;
  }

  openFilter() {
    this.clearAllFilter = true;
    this.filter = !this.filter;
  }

  createOptionsWithSprintName() {
    this._reasonCode.getSprint(this._reasonCode.sopId);
    this.sprintOptions = [];
    const sprints = this._reasonCode.sprintConfig;
    sprints.forEach(ele => {
      let temp = {};
      temp = Object.assign(
        {
          status: ele["sprint_name"],
          color: "transparent",
        },
        temp
      );
      this.sprintOptions.push(temp);
    });

    this.createOptionsWithReasonCodeName();
  }

  createOptionsWithReasonCodeName() {
    this._reasonCode.getReasonCode(this._reasonCode.sopId);
    this.reasonCodeOptions = [];

    const rcCodes = this._reasonCode.reasonCodeData;
    rcCodes.forEach(element => {
      let temp = {};
      temp = Object.assign(
        {
          status: element["name"],
          color: "transparent",
        },
        temp
      );
      this.reasonCodeOptions.push(temp);
    });
  }

  onCloseAddSprint() {
    this.openAddSprint = false;
  }

  onCancel() {
    this._reasonCode.movemodal = false;
  }

  onCreate() {
    this.openCreateSideBar = !this.openCreateSideBar;
    this.createOptionsWithSprintName();
  }

  userStoryData;

  onOpenUserStorySidebar(event, userStory) {
    this.openEditSideBar = event;
    this.userStoryData = userStory;
  }

  onCloseEditUserStories(event) {
    this.openEditSideBar = event;
  }

  onCloseCreateUserStories(event) {
    this.openCreateSideBar = event;
  }

  onDoneWarning($event) {
    this.warning = $event;
  }

  onOpenExport() {
    this.exportToModal
      .openDialog(
        createDownloadableEpicsAndUserstories(
          this._reasonCode.reasonCodeData,
          this._reasonCode.userStories
        )
      )
      .subscribe((res: any | Export | Audit) => {
        if (res && res.type && res.type === DownloadFileType.AUDIT) {
          this._reasonCode.downLoadAuditTrailFile(
            this._reasonCode.sopId,
            res.startDate,
            res.endDate
          );
        } else if (res && res.type && res.type === DownloadFileType.EXPORT) {
          this.apiService
            .downloadExportToSop(
              this._reasonCode.sopId,
              res.epics,
              res.userstories
            )
            .subscribe((data: Blob) => {
              saveAs(data, "export");
            });
        }
      });
  }

  onSelectNo() {
    this.warning = false;
    this._reasonCode.doneSelectStatus.emit(false);
  }

  onSelectYes() {
    this.warning = false;
    this._reasonCode.doneSelectStatus.emit(true);
  }

  onVirtualTabClicked(value: number) {
    let scrollPositionOfPage: number;
    this.__scrollbar.broadCastScrollPosition.subscribe(res => {
      scrollPositionOfPage = Number(res);
    });
    if (value == 0) {
      this.selectedTabIndex = value;
      this._reasonCode.getUserStories(this._reasonCode.sopId);
    } else if (value == 1) {
      this.selectedTabIndex = value;
      this._reasonCode.getCompletedUserStories(this._reasonCode.sopId);
    } else if (value == 2) {
      this.selectedTabIndex = value;
      this._reasonCode.getDeletedUserStories(this._reasonCode.sopId);
      window.scrollTo({
        top: scrollPositionOfPage,
        left: 0,
      });
    }
  }

  onTabChange($event) {
    if ($event.index == 0) {
      this.selectedTabIndex = 0;
      this._reasonCode.getUserStories(this._reasonCode.sopId);
    } else if ($event.index == 1) {
      this.selectedTabIndex = 1;
      this._reasonCode.getCompletedUserStories(this._reasonCode.sopId);
    } else if ($event.index == 2) {
      this.selectedTabIndex = 2;
      this._reasonCode.getDeletedUserStories(this._reasonCode.sopId);
    }
  }

  openVirtualFilter() {
    this.activateVirtualFilter = !this.activateVirtualFilter;
    this.openFilter();
  }

  idOfUserStoryToDelete: number;

  onDeleteUserStory($event) {
    this.warningToDeleteUserStory = $event.status;
    this.idOfUserStoryToDelete = $event.id;
  }

  onSelectDoNotDeleteUserStory() {
    this.warningToDeleteUserStory = false;
  }

  onSelectDeleteUserStory() {
    this._reasonCode.deleteUserStory(this.idOfUserStoryToDelete);
    this.warningToDeleteUserStory = false;
  }

  onClearAllFilters() {
    this._reasonCode.filterItems = {};
    this._reasonCode.rulesApproved = "";
    this._reasonCode.testCasesVerified = "";
    this._reasonCode.filteredValues = [];
    this._reasonCode.filterPath = "";
    this._reasonCode.getUserStories(this._reasonCode.sopId);
    this.clearAllFilter = false;
    this._reasonCode.filtersAppliedFlag = false;
  }

  makePath() {
    const filter = this._reasonCode.convertToStringPath(
      this._reasonCode.filterItems
    );
    this._reasonCode.filterPath = filter;
    let path = "";
    if (this._reasonCode.sortBy != "") {
      path = "?" + this._reasonCode.filterPath + "&" + this._reasonCode.sortBy;
    } else {
      path = "?" + this._reasonCode.filterPath;
    }
    return path;
  }

  onRemoveFilter(value: string, index: number) {
    for (const key in this._reasonCode.filterItems) {
      if (key.indexOf(value) != -1) {
        delete this._reasonCode.filterItems[key];
        this._reasonCode.filteredValues.splice(index, 1);
        this._reasonCode.filterUserStories(
          `/sop/epics/${this._reasonCode.sopId}/userstories/filter.json`,
          this.makePath()
        );
      }
    }
    if (
      value === "Verified Test Cases = True" ||
      value === "Verified Test Cases = False"
    ) {
      this._reasonCode.testCasesVerified = "";
      this._reasonCode.filterUserStories(
        `/sop/epics/${this._reasonCode.sopId}/userstories/filter.json`,
        this.makePath()
      );
    }

    if (
      value === "Rules Approved = True" ||
      value === "Rules Approved = False"
    ) {
      this._reasonCode.rulesApproved = "";
      this._reasonCode.filterUserStories(
        `/sop/epics/${this._reasonCode.sopId}/userstories/filter.json`,
        this.makePath()
      );
    }
  }

  /**
   * Rearrange the date in the following format DD/MM/YYYY
   * @param date
   */
  formatDate(date) {
    const dateStr = new Date(date);
    const strDate =
      "" +
      dateStr.getDate() +
      "/" +
      (dateStr.getMonth() + 1) +
      "/" +
      dateStr.getFullYear();
    return strDate;
  }

  /**
   * Format the year as 00YY
   * @param year
   */
  formatYear(year) {
    const digits = year.toString().split("");
    return "" + digits[2] + digits[3];
  }

  onCloseProjectConfig($event) {
    this.openAddSprint = $event;
    this.onClearAllFilters();
  }
}
