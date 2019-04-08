import { Component, EventEmitter, OnInit, Output } from "@angular/core";
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
  constructor(
    private sopApiService: SopApiService,
    private pageService: PageService,
    private exportService: ExportToSopService,
    private leftPanelService: LeftPanelService
  ) {}

  ngOnInit() {
    this.init();
    this.getScreenToDisplay();
  }

  init() {
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
