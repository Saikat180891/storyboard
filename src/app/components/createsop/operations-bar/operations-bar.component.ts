import { Component, OnInit } from "@angular/core";
import { StepcontrolService } from "../services/stepcontrol/stepcontrol.service";
@Component({
  selector: "operations-bar",
  templateUrl: "./operations-bar.component.html",
  styleUrls: ["./operations-bar.component.scss"],
})
export class OperationsBarComponent implements OnInit {
  isStartLoopDisplayed: boolean;

  constructor(private stepcontrolService: StepcontrolService) {}

  ngOnInit() {
    this.stepcontrolService.detectUnpairedStartLoop.subscribe(res => {
      this.isStartLoopDisplayed = !res; // don't show Start Loop if there exists an unpaired start loop step
    });
  }
}
