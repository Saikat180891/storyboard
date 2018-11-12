import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reason-code-accordian',
  templateUrl: './reason-code-accordian.component.html',
  styleUrls: ['./reason-code-accordian.component.scss']
})
export class ReasonCodeAccordianComponent implements OnInit {

  is = [1,2,3,4,5,6,7,8,9,10,]

  current;
  lastStart;
  lastEnd;
  carouselLength;
  displayLength;
  remainder;
  rounds;

  constructor() { }

  ngOnInit() {
    this.lastStart = 0;
    this.lastEnd = this.lastStart + 4;
    this.current = this.is.slice(this.lastStart, this.lastEnd);
  }

  getFocussedCards(array){
    this.carouselLength = array.length;

    if(this.carouselLength % 4 === 0){
      this.rounds = this.carouselLength / 4;
    }else{
      this.remainder = this.carouselLength % 4;
    }

    return array.slice();
  }

  moveLeft(){
    this.current
  }

  moveRight(){

  }

}
