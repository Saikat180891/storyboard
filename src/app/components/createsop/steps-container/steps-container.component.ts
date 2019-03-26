import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { StepBaseComponent } from "./step-base/step-base.component";

@Component({
  selector: "app-steps-container",
  templateUrl: "./steps-container.component.html",
  styleUrls: ["./steps-container.component.scss"],
})
export class StepsContainerComponent implements OnInit {
  @Input("sectionId") sectionId: number;
  @Input("stepType") stepType: string = "Read";
  @Input("stepIndex") stepIndex: number;
  @Input("sectionIndex") sectionIndex: number;
  @Input("stepData") stepData: any;
  @Output("delete") delete = new EventEmitter();
  @Output("outputChange") outputChange = new EventEmitter();

  @ViewChild("stepBaseToken") stepChild: StepBaseComponent;

  constructor() {}

  ngOnInit() {}

  onDeleteStep($event: Event) {
    this.delete.emit($event);
  }

  onOutputChange($event: Event) {
    this.outputChange.emit($event);
  }
}