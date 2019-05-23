import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "stb-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, OnInit {
  @Input("label") label: string;
  @Input("type") type: string;
  @Input("placeholder") placeholder: string;
  @Input("disabled") disabled: boolean;
  @Input("required") required: boolean;
  @Input("readonly") readonly: boolean;
  @Input("maxlength") maxlength: number;
  @Input("minlength") minlength: number;
  @Input("value") value: any;
  @Output("valueChange") valueChange = new EventEmitter<any>();
  @ViewChild("inputElement") inputElement: ElementRef;

  onChange: ($event) => void;
  onTouched: () => void;

  constructor(private render: Renderer2) {}

  ngOnInit(): void {
    this.initializeConponent();
  }

  initializeConponent(): void {
    if (this.type !== "number" && this.maxlength && this.minlength) {
      this.render.setProperty(
        this.inputElement.nativeElement,
        "maxlength",
        this.maxlength
      );
      this.render.setProperty(
        this.inputElement.nativeElement,
        "minlength",
        this.minlength
      );
    }
  }

  writeValue(value: any): void {
    this.value = value ? value : "";
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
