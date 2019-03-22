import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
})
export class SelectComponent implements OnInit {
  isOpen: boolean = false;
  selected: string = "";

  @Output() optionSelected = new EventEmitter<string>();

  @Input("options") options;

  @Input("placeholder") placeholder;

  @Input("value") value;

  @Input("objectOptions") objectOptions;

  constructor() {}

  ngOnInit() {}

  onOpen() {
    this.isOpen = !this.isOpen;
  }

  onSelect(event, option) {
    event.stopPropagation();
    this.selected = this.value = option;
    this.optionSelected.emit(option);
    this.isOpen = false;
  }

  onSelectObj(event, option) {
    event.stopPropagation();
    this.optionSelected.emit(option);
    this.isOpen = false;
  }
}
