import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-tooltip",
  templateUrl: "./tooltip.component.html",
  styleUrls: ["./tooltip.component.scss"],
})
export class TooltipComponent implements OnInit {
  @Input("toolTipContent") toolTipContent: string;
  @Output("toolTipDownload") toolTipDownload = new EventEmitter<boolean>();
  @Output("toolTipDelete") toolTipDelete = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  onDownloadClick($event) {
    $event.stopPropagation();
    this.toolTipDownload.emit(true);
  }

  onDeleteClick($event) {
    $event.stopPropagation();
    this.toolTipDelete.emit(true);
  }
}
