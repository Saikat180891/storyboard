import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-download-link",
  templateUrl: "./download-link.component.html",
  styleUrls: ["./download-link.component.scss"],
})
export class DownloadLinkComponent implements OnInit {
  @Input("downloadLinkName") downloadLinkName: string;
  @Output("onSelected") onSelected = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  onDownloadFile() {
    this.onSelected.emit(true);
  }
}
