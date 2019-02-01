import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input('data') data:any;
  @Input('currentImage') currentImage:any;

  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(){
    console.log(this.currentImage)

  }

}
