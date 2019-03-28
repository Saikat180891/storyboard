import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Screen } from "../common-model/screen.model";
import { PageService } from "../services/page/page.service";
import { SopApiService } from "../services/sop-api-service/sop-api.service"
import { ExportToSopService } from "../services/export-to-sop/export-to-sop.service";
import { LeftPanelService } from "../services/left-panel/left-panel.service";
@Component({
  selector: "left-panel",
  templateUrl: "./left-panel.component.html",
  styleUrls: ["./left-panel.component.scss"],
})
export class LeftPanelComponent implements OnInit {
  @Output("openMediaPane") openMediaPane = new EventEmitter<boolean>();
  isAppInZeroState: boolean = false;
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

  init(){
    this.sopApiService
      .getScreenList(this.pageService.projectId).subscribe((screens) => {
        this.exportService.storeScreens(screens);
      }, err=>{},
      () => {
        this.screens = this.exportService.getScreens();
        this.screenSelected = this.screens[1];
      });
  }

  getScreenToDisplay(){
    this.leftPanelService.getCurrentScreen().subscribe(res => {
      this.currentScreen = res;
    })
  }

  onOpenMediaPane() {
    this.openMediaPane.emit(true);
  }
}
