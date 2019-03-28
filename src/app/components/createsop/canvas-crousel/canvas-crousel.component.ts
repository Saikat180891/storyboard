import { Component, Input, OnChanges, OnInit } from "@angular/core";

@Component({
  selector: "app-canvas-crousel",
  templateUrl: "./canvas-crousel.component.html",
  styleUrls: ["./canvas-crousel.component.scss"],
})
export class CanvasCrouselComponent implements OnInit, OnChanges {
  @Input("data") data: any;
  @Input("currentScreen") currentScreen: number;
  goto: number;
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.scrollTo(this.currentScreen);
  }

  scrollTo(screenId: number) {
    this.data.forEach((element, index: number) => {
      if (element.screenId === screenId) {
        this.goto = index;
      }
    });
  }
}
