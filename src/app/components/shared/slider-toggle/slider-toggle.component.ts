import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "stb-slider-toggle",
  templateUrl: "./slider-toggle.component.html",
  styleUrls: ["./slider-toggle.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderToggleComponent),
      multi: true,
    },
  ],
})
export class SliderToggleComponent implements ControlValueAccessor {
  @Input("label") label: string;
  @Input("type") type: string;
  @Input("placeholder") placeholder: string;
  @Input("disabled") disabled: boolean;
  @Input("required") required: boolean;
  @Input("readonly") readonly: boolean;

  checked: boolean = false;
  notChecked: boolean = false;
  onChange: (value: boolean) => void;
  onTouched: () => void;

  constructor() {}

  onToggle(isChecked: boolean): void {
    this.checked = isChecked;
    this.onChange(isChecked);
  }

  writeValue(checked: boolean): void {
    this.checked = checked ? checked : this.notChecked;
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
}
