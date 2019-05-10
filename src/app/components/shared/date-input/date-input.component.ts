import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatDatepickerInputEvent } from "@angular/material";
import { convertStartDateforBackend } from "../date-utils";

@Component({
  selector: "stb-datepicker",
  templateUrl: "./date-input.component.html",
  styleUrls: ["./date-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent implements ControlValueAccessor {
  @Input("date") date: Date;
  @Input("label") label: string;
  @Input("disabled") disabled: boolean;
  @Output("dateChange") dateChange = new EventEmitter<string>();

  value: any;
  onChange: () => void;
  onTouched: () => void;

  constructor() {}

  writeValue(value: any): void {
    this.value = value ? value : "";
  }

  registerOnChange(fn: any): void {
    this.onDateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onDateChange(date: Date) {
    // to be used for ngModel
    this.dateChange.emit(convertStartDateforBackend(date));
    // to be used with formControl
    this.value = date;
  }
}
