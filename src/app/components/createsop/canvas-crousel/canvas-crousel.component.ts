import { Component, Input, OnInit, ViewChild, ElementRef, OnChanges } from "@angular/core";

@Component({
  selector: "app-canvas-crousel",
  templateUrl: "./canvas-crousel.component.html",
  styleUrls: ["./canvas-crousel.component.scss"],
})
export class CanvasCrouselComponent implements OnInit, OnChanges {
  @Input("data") data: any;
  @Input("currentScreen") currentScreen: number;
  @ViewChild("carouselWrapper") carouselWrapper: ElementRef;
  constructor() {}

  ngOnInit() {
  }
  
  ngOnChanges(){
    console.log(this.currentScreen)
    this.scrollTo(this.currentScreen);
  }

  scrollTo(screenId: number){
    for(let i = 0; i < this.carouselWrapper.nativeElement.children.length; i++){
      if(this.carouselWrapper.nativeElement.children[i].id === `screen-${screenId}`){
        this.carouselWrapper.nativeElement.children[i].scrollIntoView();
      }
    }
    // document.getElementById(`screen-${screenId}`).scrollIntoView();
  }
}
