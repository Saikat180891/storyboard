import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Project } from "../../projects/models/project.model";
import { ReasonCodeService } from "../../reasoncodes/reason-code.service";
import { dummyBlankScreen, Screen } from "../common-model/screen.model";
import { ExportToSopService } from "../services/export-to-sop/export-to-sop.service";
import { LeftPanelService } from "../services/left-panel/left-panel.service";
import { PageService } from "../services/page/page.service";
import { SopApiService } from "../services/sop-api-service/sop-api.service";

@Component({
  selector: "left-panel",
  templateUrl: "./left-panel.component.html",
  styleUrls: ["./left-panel.component.scss"],
})
export class LeftPanelComponent implements OnInit {
  @Output("openMediaPane") openMediaPane = new EventEmitter<boolean>();
  isAppInZeroState: boolean = true;
  screens: Screen[] = [];

  screenSelected: Screen;
  currentScreen: number;
  listOfUserStories: [];
  project: Project;

  constructor(
    private sopApiService: SopApiService,
    private pageService: PageService,
    private exportService: ExportToSopService,
    private leftPanelService: LeftPanelService,
    private reasonCodeService: ReasonCodeService
  ) {}

  ngOnInit() {
    this.init();
    this.getScreenToDisplay();
    this.prepareBreadCrumbData();
  }

  prepareBreadCrumbData() {
    this.reasonCodeService.selectedProjectObservable.subscribe(res => {
      this.project = res;
    });

    this.reasonCodeService.userStoriesListObservable.subscribe(res => {
      this.listOfUserStories = res;
    });
  }

  init() {
    // if user refreshes the sop page we need to fetch user stories and current project details for breadcrumb
    if (Object.keys(this.reasonCodeService.currentProject).length === 0) {
      this.reasonCodeService.getUserStories(this.pageService.projectId);
      this.reasonCodeService.getSopByID(this.pageService.projectId);
    }

    this.sopApiService
      .getScreenList(this.pageService.projectId)
      .subscribe((screens: Screen[]) => {
        screens.unshift(dummyBlankScreen);
        this.exportService.storeScreens(screens);
        this.getScreensFromExportService();
      });
  }

  getScreensFromExportService() {
    this.exportService.getScreensAsObservable().subscribe(screens => {
      this.screens = screens;
      if (this.screens.length > 0) {
        this.isAppInZeroState = !this.isAppInZeroState;
      }
      this.screenSelected = this.screens[0];
      this.getScreenToDisplay();
    });
  }

  getScreenToDisplay() {
    this.leftPanelService.getCurrentScreen().subscribe(res => {
      this.currentScreen = res;
      this.screens.forEach((screen, index) => {
        if (screen.screenId === res) {
          this.screenSelected = this.screens[index];
        }
      });
    });
  }

  onOpenMediaPane() {
    this.openMediaPane.emit(true);
  }
}
