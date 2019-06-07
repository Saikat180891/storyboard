import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ReasonCodeService } from "../reason-code.service";
@Component({
  selector: "app-sort",
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.scss"],
})
export class SortComponent implements OnInit {
  @Output("close") close = new EventEmitter<boolean>();
  @Input("selectedTab") selectedTab: number;

  userstoryType = ["open", "completed", "deleted"];

  sortBy: boolean = false;

  constructor(private reasonCodeService: ReasonCodeService) {}

  ngOnInit() {}

  onSortBy(args: string) {
    this.reasonCodeService.sortBy = args;
    this.sortBy = true;
    let path = "";
    if (this.reasonCodeService.filterPath != "") {
      path =
        "?" +
        this.reasonCodeService.filterPath +
        "&" +
        this.reasonCodeService.sortBy;
    } else {
      path = "?" + this.reasonCodeService.sortBy;
    }
    this.reasonCodeService.sortAndFilterPath = path;
    if (path) {
      path += `&&us_type=${this.userstoryType[this.selectedTab]}`;
    }
    this.reasonCodeService.filterUserStories(
      `/sop/epics/${this.reasonCodeService.sopId}/userstories.json`,
      path,
      this.selectedTab
    );
    this.close.emit(false);
  }
}
