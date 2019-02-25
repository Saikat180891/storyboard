import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'left-panel',
  templateUrl: './left-panel.component.html',
  styleUrls: ['./left-panel.component.scss']
})
export class LeftPanelComponent implements OnInit {

  currentImage :number=0;
  imageGalleryContent = [
                        '../../../../assets/pics/download.jpg',
                        '../../../../assets/pics/logo.png',
                        '../../../../assets/pics/wallpaper.jpg'];
  constructor() { }

  ngOnInit() {

  }

    //for carousel
    onCarouselMoveUp(){
      /**
       * this function is use to change the image in the carousel 
       * by using the up button
       */      
      if(this.currentImage > 0){
        this.currentImage = this.currentImage - 1;
      }
    }
  
    onCarouselMoveDown(){
      /**
       * this function is used to change the image in the carousel
       * by using the down button
       */

      if(this.currentImage < this.imageGalleryContent.length - 1){
        this.currentImage = this.currentImage + 1;
      }
    }

}
