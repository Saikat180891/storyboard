import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-sidebar-buttons",
  templateUrl: "./sidebar-buttons.component.html",
  styleUrls: ["./sidebar-buttons.component.scss"],
})
export class SidebarButtonsComponent implements OnInit {
  @Output("open") open = new EventEmitter<any>();

  openMediaPane: boolean = false;

  selected: number = -1;

  sidebarLinks = [
    {
      logo: "",
      linkCaption: "Media",
      function: "media",
    },
  ];

  constructor() {}

  ngOnInit() {}

  onOpenMediaPane(type: string, index: number) {
    /**
     * this function is used to open the media pane
     */
    this.selected = index;
    this.openMediaPane = !this.openMediaPane;
    this.open.emit({ type, shouldOpen: this.openMediaPane });
  }
}
