import { Component, OnInit } from "@angular/core";
import { OperationBarService } from "../services/operation-bar/operation-bar.service";
@Component({
  selector: "operations-bar",
  templateUrl: "./operations-bar.component.html",
  styleUrls: ["./operations-bar.component.scss"],
})
export class OperationsBarComponent implements OnInit {
  isStartLoopDisplayed: boolean;

  constructor(private __loopStatus: OperationBarService) {}

  ngOnInit() {
    this.__loopStatus.getLoopStatus().subscribe(res => {
      this.isStartLoopDisplayed = res;
    });
  }
}
