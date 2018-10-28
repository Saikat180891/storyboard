import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';

@Component({
  selector: 'app-screen-holder',
  templateUrl: './screen-holder.component.html',
  styleUrls: ['./screen-holder.component.scss']
})
export class ScreenHolderComponent implements OnInit {

  imgs = [1,2,3,4,5,6];
  prev="";
  focus = "";
  nxt="";

  img_no:number = 0;
  constructor(private el: ElementRef) {
    
   }

  ngOnInit() {

  }
  previous(){
    this.img_no--;
    this.prev = `../../../../assets/pics/img${this.img_no - 1}.jpg`;
    this.focus = `../../../../assets/pics/img${this.img_no}.jpg`;
    this.nxt = `../../../../assets/pics/img${this.img_no + 1}.jpg`;
    if(this.img_no<=0){
      this.img_no = 6;
    }
  }

  next(){
    this.img_no++;
    this.prev = `../../../../assets/pics/img${this.img_no - 1}.jpg`;
    this.focus = `../../../../assets/pics/img${this.img_no}.jpg`;
    this.nxt = `../../../../assets/pics/img${this.img_no + 1}.jpg`;
    if(this.img_no>=6){
      this.img_no = 0;
    }
  }

}
