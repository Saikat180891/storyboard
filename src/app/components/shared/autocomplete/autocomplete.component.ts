import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { fromEvent } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { AutocompleteOption } from "./AutocompleteOption.model";
@Component({
  selector: "stb-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
  host: {
    "(document:click)": "onClickOutsideDropdown($event)",
  },
})
export class AutocompleteComponent
  implements ControlValueAccessor, AfterViewInit {
  @Input("label") label: string;
  @Input("type") type: string;
  @Input("placeholder") placeholder: string;
  @Input("disabled") disabled: boolean;
  @Input("required") required: boolean;
  @Input("readonly") readonly: boolean;
  @Input("inputViewLabel") inputViewLabel: string = "";
  @Input("autocompleteOptions") autocompleteOptions: AutocompleteOption[] = [];

  @Output("valueChange") valueChange = new EventEmitter<string>();
  @ViewChild("autocomplete") autocomplete: ElementRef;

  value: number | string;
  timeInterval: any;
  timeout: any;

  constructor(private el: ElementRef) {}

  onInputChange = (value?: any) => {};
  onTouched: () => void;

  ngAfterViewInit() {
    fromEvent(this.autocomplete.nativeElement, "keyup")
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(res => {
        if (res["target"].value) {
          this.valueChange.emit(res["target"].value);
        }
      });
  }

  onClickOutsideDropdown(event: any): void {
    if (!this.el.nativeElement.contains(event.target)) {
      this.autocompleteOptions = [];
    }
  }

  onValueChange(value: any) {
    const found = this.autocompleteOptions.find(
      option => option.value === value
    );
    this.inputViewLabel = found.label;
    this.onInputChange(value);
    this.autocompleteOptions = [];
  }

  writeValue(value: any): void {
    this.value = value ? value : "";
  }

  registerOnChange(fn: any): void {
    this.onInputChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
