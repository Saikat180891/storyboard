import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-canvas-crousel',
  templateUrl: './canvas-crousel.component.html',
  styleUrls: ['./canvas-crousel.component.scss']
})
export class CanvasCrouselComponent implements OnInit {
  @ViewChild('canvasCarousel') canvasCarousel:ElementRef;

  constructor() { }

  ngOnInit() {
    this.initialize()
  }

  initialize(){
    let canvas = this.canvasCarousel.nativeElement;
    let canvasWidth = this.canvasCarousel.nativeElement.width;
    let canvasHeight = this.canvasCarousel.nativeElement.height;
    let ctx = canvas.getContext('2d');
    
    let img = new Image();
    img.src = 'http://localhost:8000/sop/21/image/image1645125.531.jpeg';
    img.width = canvasWidth;
    img.height = canvasHeight;

    img.onload = function(){
      // ctx.imageSmoothingEnabled = false;
      // ctx.filter = 'blur(0px)';
      ctx.drawImage(img ,0, 0, img.width, img.height, 0, 0, img.width, img.height);
    }
  }
}
