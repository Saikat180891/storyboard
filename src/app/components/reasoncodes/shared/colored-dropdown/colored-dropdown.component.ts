import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { RouteConfigLoadStart } from "@angular/router";
interface Option {
  status: string;
  color: string;
}
@Component({
  selector: "colored-dropdown",
  templateUrl: "./colored-dropdown.component.html",
  styleUrls: ["./colored-dropdown.component.scss"],
})
export class ColoredDropdownComponent
  implements OnInit, AfterViewInit, OnChanges {
  isOpen: boolean = false;
  selected: any = "";
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
        const pos = this.options.indexOf(element);
        this.selected = this.value = this.options[pos];
        this.applyPadding = true;
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
