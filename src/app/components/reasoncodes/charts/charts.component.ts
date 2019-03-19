import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { fromEvent } from "rxjs";
import { ReasonCodeService } from "../reason-code.service";

declare let d3: any;

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"],
})
export class ChartsComponent implements OnInit, AfterViewChecked, OnChanges {
  @Input("options") options;
  @Input("data") data;
  @Input("title") title;
  @Input("selectOptions") selectOptions;
  @Input("meter") meter: boolean;
  @Input("projectStatus") projectStatus;
  @Input("extras") extras: boolean;
  @Input("ifButtonRequired") ifButtonRequired: boolean = false;
  @Output("onClick") onClick = new EventEmitter<any>();
  @ViewChild("dimensionController") dimensionController: ElementRef;
  selectedSprint;

  constructor(private _rcService: ReasonCodeService) {}

  onSelect(id) {
    this.selectedSprint = id;
    this._rcService.getChartData(id);
  }

  ngAfterViewChecked() {}

  ngOnChanges() {}

  onButtonClick() {
    this.onClick.emit(true);
  }

  ngOnInit() {
    fromEvent(window, "resize").subscribe(res => {
      this.options.chart.width = this.dimensionController.nativeElement.parentNode.parentNode.clientWidth;
    });
    this.options.chart.width = this.dimensionController.nativeElement.parentNode.parentNode.clientWidth;
  }

  getCurrentSprint() {
    return this.projectStatus && this.projectStatus.current_sprint
      ? this.projectStatus.current_sprint
      : "";
  }
}
