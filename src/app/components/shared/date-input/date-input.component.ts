import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { convertStartDateforBackend } from "../date-utils";
@Component({
  selector: "stb-datepicker",
  templateUrl: "./date-input.component.html",
  styleUrls: ["./date-input.component.scss"],
})
export class DateInputComponent implements OnInit {
  @Input("date") date: string;
  @Input("label") label: string;
  @Output("dateChange") dateChange = new EventEmitter<string>();
  @Input("disabled") disabled: boolean;
  constructor() {}

  ngOnInit() {}

  onDateChange($event) {
    this.dateChange.emit(convertStartDateforBackend($event.value));
  }
}
