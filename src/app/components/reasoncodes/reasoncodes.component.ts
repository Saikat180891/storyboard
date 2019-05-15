import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { saveAs } from "file-saver";
import { NgxSpinnerService } from "ngx-spinner";
import { SharedService } from "src/app/services/shared-services/shared.service";
import { hideInOut } from "../../animation";
import { ProjectsService } from "../projects/projects.service";
import { ConfirmModalService } from "../shared/confirm-modal/confirm-modal.service";
import { charts } from "./chartoptions";
import { Audit } from "./export-dialog-box/export-dialog-box.component";
import { Export } from "./export-sop-as-word/export-sop-as-word.component";
import { createDownloadableEpicsAndUserstories } from "./export-sop-as-word/export-sop-as-word.helpers";
import { DownloadFileType } from "./export-to-word-modal/export-to-word-modal.component";
import { ExportToWordModalService } from "./export-to-word-modal/export-to-word-modal.service";
import { ServerUserstory } from "./models/Userstory.model";
import { ReasonCodeService } from "./reason-code.service";
import { ApiService } from "./services/api.service";
import { UserstoryModalName } from "./userstory-create-edit-modal/modaltype.enum";
import { UserstoryCreateEditModalService } from "./userstory-create-edit-modal/userstory-create-edit-modal.service";
import { UserstoryControls } from "./userstory-menu-bar/userstory-menu-bar.component";

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
  openAddSprint: boolean = false;
  pieChartOptions = {};
  barChartOptions = {};
  sopId: number;
  userStories = [];
  sprintOptions = [];
  reasonCodeOptions = [];
  fixToTop: boolean = false;
  filter: boolean = false;
  sortBy: boolean = false;
  clearAllFilter: boolean = true;
  showBenefitsChart: boolean = false;
  rippleColor = "rbga(0,0,0,0.2)";
  role: string;
  permissions: any;
  enableView: boolean = true;
  userStoryData;
  selectedTab: number = 0;
  benefitChartImage: string;
  currentProject;

  constructor(
    private route: ActivatedRoute,
    private reasonCodeService: ReasonCodeService,
    private projectsService: ProjectsService,
    public spinner: NgxSpinnerService,
    private exportToModal: ExportToWordModalService,
    private apiService: ApiService,
    private userstoryEditCreateModal: UserstoryCreateEditModalService,
    private confirm: ConfirmModalService,
    private sharedService: SharedService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.route.params.subscribe(params => {
      this.reasonCodeService.sopId = parseInt(params.id);
      this.getPermissionForEpicsPage(2, this.reasonCodeService.sopId);
      this.projectsService.cardContents.forEach(element => {
        if (element.id == this.reasonCodeService.sopId) {
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
        this.filter = false;
        return;
      case UserstoryControls.FILTER:
        this.filter = !this.filter;
        this.sortBy = false;
        return;
      case UserstoryControls.CREATEUS:
        this.sortBy = false;
        this.filter = false;
        this.createUserstory();
        return;
    }
  }

  ngOnDestroy() {
    this.reasonCodeService.destroyAllService();
  }

  getPermissionForEpicsPage(pageNumber: number, projectId: number) {
    this.reasonCodeService.getPermission(pageNumber, projectId).subscribe(
      res => {
        this.reasonCodeService.role = this.role = res[0].name;
        this.reasonCodeService.grantedPermission = this.permissions =
          res[0].permissions;
        if ("Can add user stories" in this.permissions) {
          this.enableView = this.permissions["Can add user stories"];
        }
      },
      err => {},
      () => {
        this.reasonCodeService.refresh(this.reasonCodeService.sopId);
      }
    );
  }

  onCloseBenefits() {
    this.showBenefitsChart = false;
  }

  onShowBenefits(event) {
    this.benefitChartImage = this.apiService.getBenefitsChart(
      this.reasonCodeService.sopId
    );
    this.showBenefitsChart = true;
  }

  clearAllSort() {
    this.reasonCodeService.getUserStories(this.reasonCodeService.sopId);
  }

  onOpenAddSprint() {
    this.reasonCodeService.getSprint(this.reasonCodeService.sopId);
    this.reasonCodeService.getReasonCode(this.reasonCodeService.sopId);
    const sprints = this.reasonCodeService.sprintConfig;
    this.openAddSprint = !this.openAddSprint;
  }

  openFilter() {
    this.clearAllFilter = true;
    this.filter = !this.filter;
  }

  createOptionsWithSprintName() {
    this.reasonCodeService.getSprint(this.reasonCodeService.sopId);
    this.sprintOptions = [];
    const sprints = this.reasonCodeService.sprintConfig;
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
    this.reasonCodeService.getReasonCode(this.reasonCodeService.sopId);
    this.reasonCodeOptions = [];

    const rcCodes = this.reasonCodeService.reasonCodeData;
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

  onCancel() {
    this.reasonCodeService.movemodal = false;
  }

  createUserstory() {
    this.userstoryEditCreateModal
      .openDialog(
        this.reasonCodeService.sopId,
        UserstoryModalName.CREATE,
        this.reasonCodeService.sprintConfig,
        this.reasonCodeService.reasonCodeData
      )
      .subscribe(response =>
        this.reasonCodeService.refresh(this.reasonCodeService.sopId)
      );
  }

  onEditUserstory(event, userStory) {
    this.userstoryEditCreateModal
      .openDialog(
        this.reasonCodeService.sopId,
        UserstoryModalName.EDIT,
        this.reasonCodeService.sprintConfig,
        this.reasonCodeService.reasonCodeData,
        userStory
      )
      .subscribe(response =>
        this.reasonCodeService.refresh(this.reasonCodeService.sopId)
      );
  }

  onOpenExport() {
    this.exportToModal
      .openDialog(
        createDownloadableEpicsAndUserstories(
          this.reasonCodeService.reasonCodeData,
          this.reasonCodeService.userStories
        )
      )
      .subscribe((res: any | Export | Audit) => {
        if (res && res.type && res.type === DownloadFileType.AUDIT) {
          this.reasonCodeService.downLoadAuditTrailFile(
            this.reasonCodeService.sopId,
            res.startDate,
            res.endDate
          );
        } else if (res && res.type && res.type === DownloadFileType.EXPORT) {
          this.apiService
            .downloadExportToSop(
              this.reasonCodeService.sopId,
              res.epics,
              res.userstories
            )
            .subscribe((data: Blob) => {
              saveAs(data, "export");
            });
        }
      });
  }

  onDeleteUserStory(userstoryId: number) {
    this.confirm.confirmDelete(
      "Are you sure you want to delete this user story?",
      () => {
        this.reasonCodeService.deleteUserStory(userstoryId);
      },
      () => {}
    );
  }

  onClearAllFilters() {
    this.reasonCodeService.filterItems = {};
    this.reasonCodeService.rulesApproved = "";
    this.reasonCodeService.testCasesVerified = "";
    this.reasonCodeService.filteredValues = [];
    this.reasonCodeService.filterPath = "";
    this.reasonCodeService.getUserStories(this.reasonCodeService.sopId);
    this.clearAllFilter = false;
    this.reasonCodeService.filtersAppliedFlag = false;
  }

  makePath() {
    const filter = this.reasonCodeService.convertToStringPath(
      this.reasonCodeService.filterItems
    );
    this.reasonCodeService.filterPath = filter;
    let path = "";
    if (this.reasonCodeService.sortBy != "") {
      path =
        "?" +
        this.reasonCodeService.filterPath +
        "&" +
        this.reasonCodeService.sortBy;
    } else {
      path = "?" + this.reasonCodeService.filterPath;
    }
    return path;
  }

  onRemoveFilter(value: string, index: number) {
    for (const key in this.reasonCodeService.filterItems) {
      if (key.indexOf(value) != -1) {
        delete this.reasonCodeService.filterItems[key];
        this.reasonCodeService.filteredValues.splice(index, 1);
        this.reasonCodeService.filterUserStories(
          `/sop/epics/${this.reasonCodeService.sopId}/userstories/filter.json`,
          this.makePath()
        );
      }
    }
    if (
      value === "Verified Test Cases = True" ||
      value === "Verified Test Cases = False"
    ) {
      this.reasonCodeService.testCasesVerified = "";
      this.reasonCodeService.filterUserStories(
        `/sop/epics/${this.reasonCodeService.sopId}/userstories/filter.json`,
        this.makePath()
      );
    }

    if (
      value === "Rules Approved = True" ||
      value === "Rules Approved = False"
    ) {
      this.reasonCodeService.rulesApproved = "";
      this.reasonCodeService.filterUserStories(
        `/sop/epics/${this.reasonCodeService.sopId}/userstories/filter.json`,
        this.makePath()
      );
    }
  }

  onCloseProjectConfig($event) {
    this.openAddSprint = $event;
    this.onClearAllFilters();
  }

  createUserstoryPayloadForBackend(
    userstory: ServerUserstory
  ): ServerUserstory {
    return {
      dev_hrs: userstory.dev_hrs || 0,
      ftes: userstory.ftes || 0,
      notes: userstory.notes,
      planned_delivery: userstory.planned_delivery,
      rules_approved: userstory.rules_approved,
      status: userstory.status,
      us_name: userstory.us_name,
      us_number: userstory.us_number,
      verified_test_cases: userstory.verified_test_cases,
      priority: userstory.priority || "",
    };
  }

  onUserstoryToggled($event: ServerUserstory): void {
    this.spinner.show();
    this.apiService
      .editUserstory(
        $event.id,
        $event.sprint_id || 0,
        $event.rc_id || 0,
        $event.assignee_id || 0,
        this.createUserstoryPayloadForBackend($event)
      )
      .subscribe(
        userstory => {
          this.spinner.hide();
          this.snackbar.open("Userstory modified successfully", "Success", {
            duration: 5000,
          });
          this.reasonCodeService.refresh(this.reasonCodeService.sopId);
        },
        err => {
          this.spinner.hide();
          this.sharedService.raiseError(err);
        }
      );
  }
}
