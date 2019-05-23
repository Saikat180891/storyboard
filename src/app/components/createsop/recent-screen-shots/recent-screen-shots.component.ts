import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PageService } from "../services/page/page.service";

@Component({
  selector: "recent-screen-shots",
  templateUrl: "./recent-screen-shots.component.html",
  styleUrls: [
    "./recent-screen-shots.component.scss",
    "../video-gallery/video-gallery.component.scss",
  ],
})
export class RecentScreenShotsComponent implements OnInit {
  toggleExpansionPanel: boolean = false;
  @Output("open") open = new EventEmitter<boolean>();
  @Output("exportSelectedImageToSop")
  exportSelectedImageToSop = new EventEmitter<any>();
  @Input("data") data: any;
  selected: number = -1;
  constructor(private page: PageService) {}

  ngOnInit() {}

  onExpandPanel() {
    /**
     * this function is used to open and close the recents tabs panel
     */
    this.toggleExpansionPanel = !this.toggleExpansionPanel;
    this.open.emit(this.toggleExpansionPanel);
  }

  onThumbnailSelect(index: number, content: any) {
    this.selected = index;
  }
  onExportImage(index: number, content: any) {
    this.exportSelectedImageToSop.emit({
      content,
    });
    this.page.shouldShowExportToSopModal = true;
  }
}
