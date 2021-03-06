import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent implements OnInit, OnChanges {
  @ViewChild("carouselContainer") carouselContainer: ElementRef;
  @Input("data") data: any;
  @Input("currentImage") currentImage: any;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {}
}
