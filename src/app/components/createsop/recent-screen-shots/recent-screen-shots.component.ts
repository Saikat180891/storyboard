import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

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
  @Input("data") data: any;
  selected: number = -1;
  constructor() {}

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
}
