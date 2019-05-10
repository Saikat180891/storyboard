import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Renderer2,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatSelectChange } from "@angular/material";

@Component({
  selector: "stb-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  @Input("label") label: string;
  @Input("type") type: string;
  @Input("placeholder") placeholder: string;
  @Input("disabled") disabled: boolean;
  @Input("required") required: boolean;
  @Input("options") options: DropdownOptions[] = [];
  @Output("selectionChange") selectionChange = new EventEmitter<any>();
  value: any;
  private onChange;
  onTouched: () => void;

  constructor() {}

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  selectItem(item: MatSelectChange): void {
    this.onChange(item.value);
    this.value = item.value;
    this.selectionChange.emit(item);
  }
}

export interface DropdownOptions {
  label: string;
  value: string | number;
}
