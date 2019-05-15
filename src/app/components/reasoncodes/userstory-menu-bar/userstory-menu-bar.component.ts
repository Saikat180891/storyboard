import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
export enum UserstoryControls {
  SORT = 0,
  FILTER = 1,
  CREATEUS = 2,
}
@Component({
  selector: "app-userstory-menu-bar",
  templateUrl: "./userstory-menu-bar.component.html",
  styleUrls: ["./userstory-menu-bar.component.scss"],
})
export class UserstoryMenuBarComponent implements OnInit {
  @Input("toggleFilter") toggleFilter: boolean = false;
  @Input("toggleSort") toggleSort: boolean = false;

  @Output("tabChange") tabChange = new EventEmitter<number>();
  @Output("controlSelected") controlSelected = new EventEmitter<number>();

  tabs: string[] = ["Open U/S", "Completed U/S", "Deleted U/S"];
  selectedTab: number = 0;

  constructor() {}

  ngOnInit() {}

  onTabSelectionChange(index: number): void {
    this.selectedTab = index;
    this.tabChange.emit(index);
  }

  onControlSelect(controlSelected: number): void {
    this.controlSelected.emit(controlSelected);
  }
}
