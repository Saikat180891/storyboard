import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

interface SprintRowValue {
  sprintName: string;
  startDate: Date;
  duration: string;
  endDate: string;
}

@Component({
  selector: "app-sprint-input-row",
  templateUrl: "./sprint-input-row.component.html",
  styleUrls: ["./sprint-input-row.component.scss"],
})
export class SprintInputRowComponent implements OnInit {
  @Input("index") index: number;
  @Input("value") value: SprintRowValue = {
    sprintName: null,
    startDate: null,
    duration: null,
    endDate: null,
  };
  @Output("valueChange") valueChange = new EventEmitter<SprintRowValue>();
  @Output("deleteSprint") deleteSprint = new EventEmitter<number>();
  private weeks = 0;

  formValues: SprintRowValue;

  constructor() {}

  ngOnInit() {
    this.checkifCreateCompWithPlaceholderOrReceivedData();
  }

  checkifCreateCompWithPlaceholderOrReceivedData() {
    if (this.value.sprintName === undefined) {
      this.formValues = {
        sprintName: "Sprint X",
        startDate: new Date(),
        duration: `${this.weeks}W`,
        endDate: "",
      };
    } else {
      this.formValues = this.value;
    }
  }

  onDeleteSprint() {
    this.deleteSprint.emit(this.index);
  }

  onSprintChange($event) {
    this.valueChange.emit(this.formValues);
  }

  onDatePickerClose($event) {
    this.calculateEndDate(this.weeks);
    this.valueChange.emit(this.formValues);
  }

  onArrowUp() {
    const weeks = this.incDate();
    this.calculateEndDate(weeks);
    this.valueChange.emit(this.formValues);
  }

  onArrowDown() {
    const weeks = this.decDate();
    this.calculateEndDate(weeks);
    this.valueChange.emit(this.formValues);
  }

  incDate(): number {
    if (this.weeks < 9) {
      this.weeks += 1;
      this.formValues.duration = `${this.weeks}W`;
    }
    return this.weeks;
  }

  decDate(): number {
    if (this.weeks > 0) {
      this.weeks -= 1;
      this.formValues.duration = `${this.weeks}W`;
    }
    return this.weeks;
  }

  calculateEndDate(weeks: number) {
    const days = weeks * 7;
    const date = new Date(this.formValues.startDate);
    date.setDate(date.getDate() + days);
    const endDate = new Date(date);
    this.formValues.endDate = `${endDate.getMonth() +
      1}/${endDate.getDate()}/${endDate.getFullYear()}`;
  }
}
