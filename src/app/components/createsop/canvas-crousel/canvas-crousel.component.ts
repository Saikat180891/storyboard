import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-canvas-crousel",
  templateUrl: "./canvas-crousel.component.html",
  styleUrls: ["./canvas-crousel.component.scss"],
})
export class CanvasCrouselComponent implements OnInit {
  @Input("data") data: any;
  @Input("currentImage") currentImage: any;

  constructor() {}

  ngOnInit() {}
}
