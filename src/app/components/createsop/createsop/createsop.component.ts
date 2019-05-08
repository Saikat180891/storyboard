import {
  AfterContentChecked,
  Component,
  OnChanges,
  OnInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { DataService } from "../../../data.service";
import { PageService } from "../services/page/page.service";
import { StepcontrolService } from "../services/stepcontrol/stepcontrol.service";
import { UicontrolService } from "../services/uicontrol.service";
interface Snapshot {
  id: number;
  thumbnail: string;
}
@Component({
  selector: "app-createsop",
  templateUrl: "./createsop.component.html",
  styleUrls: ["./createsop.component.scss"],
})
export class CreatesopComponent
  implements OnInit, AfterContentChecked, OnChanges {
  openSidebar: any;
  toggleRecentSnapshot: boolean = false;
  imageGalleryContent = [];
  showExportToSop: boolean = false;
  imageDataToExport: Snapshot;
  constructor(
    private routes: ActivatedRoute,
    private __uic: UicontrolService,
    private __page: PageService,
    private __steps: StepcontrolService,
    private __api: DataService,
    private router: Router,
    private ngxSpinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.ngxSpinnerService.show();
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.routes.params.subscribe(res => {
      if (res && res.id) {
        this.__page.projectId = res.id;
      }

      if (res && res.userStoryId) {
        this.__page.userStoryId = parseInt(res.userStoryId);
      }
    });
  }

  ngAfterContentChecked() {
    this.imageGalleryContent = this.__page.imageGalleryContent;
  }

  ngOnChanges() {}

  isSideBarOpen($event: Event) {
    this.openSidebar = $event;
  }

  onOpenSidebar($event: Event) {
    if ($event.type == "media") {
      this.openSidebar = $event["shouldOpen"];
    }
  }

  onOpenRecentScreenshot($event: boolean) {
    this.toggleRecentSnapshot = $event;
  }

  onRequestedSelectType($event) {}

  onSelectedImageToExport($event) {
    this.imageDataToExport = $event.content;
  }
}
