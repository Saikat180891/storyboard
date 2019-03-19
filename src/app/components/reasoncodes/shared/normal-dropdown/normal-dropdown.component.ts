import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";

interface Option {
  status: string;
  color: string;
}

@Component({
  selector: "normal-dropdown",
  templateUrl: "./normal-dropdown.component.html",
  styleUrls: ["./normal-dropdown.component.scss"],
})
export class NormalDropdownComponent
  implements OnInit, AfterViewInit, OnChanges {
  isOpen: boolean = false;
  selected: string = "";
  selectedColor: string;
  applyPadding: boolean = false;

  @Output() optionSelected = new EventEmitter<string>();

  @Input("options") options: Option[];

  @Input("placeholder") placeholder;

  @Input("value") value: Option;

  @Input("objectOptions") objectOptions;

  @Input("colors") colors: Array<string>;

  @Input("defaultOption") defaultOption: any;

  constructor() {}

  ngOnInit() {
    this.changeColorofDefaultOption();
  }

  ngAfterViewInit() {}

  ngOnChanges(changes: SimpleChanges) {}

  changeColorofDefaultOption() {
    this.options.forEach(element => {
      if (element.status === this.defaultOption) {
        this.selectedColor = element.color;
      }
    });
  }

  onOpen() {
    this.isOpen = !this.isOpen;
  }

  onSelect(event, option) {
    event.stopPropagation();
    this.selected = this.value = option;
    this.applyPadding = true;
    this.optionSelected.emit(option);
    this.isOpen = false;
  }

  onSelectObj(event, option) {
    event.stopPropagation();
    this.optionSelected.emit(option);
    this.isOpen = false;
  }
}
