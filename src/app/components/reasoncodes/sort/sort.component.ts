import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ReasonCodeService } from "../reason-code.service";
@Component({
  selector: "app-sort",
  templateUrl: "./sort.component.html",
  styleUrls: ["./sort.component.scss"],
})
export class SortComponent implements OnInit {
  @Output("close") close = new EventEmitter<boolean>();
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
    this.reasonCodeService.filterUserStories(
      `/sop/epics/${this.reasonCodeService.sopId}/userstories/filter.json`,
      path
    );
    this.close.emit(false);
  }
}
