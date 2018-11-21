import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import {ScreenHolderService} from '../screen-holder/screen-holder.service';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-add-steps-holder',
  templateUrl: './add-steps-holder.component.html',
  styleUrls: ['./add-steps-holder.component.scss']
})
export class AddStepsHolderComponent implements OnInit, OnChanges {

  // @ViewChild('steps') steps: ElementRef;
  // steps = [];

  constructor(private _screenHolderService: ScreenHolderService) { }

  ngOnInit() {
    // fromEvent(this.steps.nativeElement, 'scroll')
    //   .subscribe(res => {
    //     console.log(res["target"].scrollTop);
    //     // console.log(res)
    //   });

    
  }

  ngOnChanges(){
    // this.steps = this._screenHolderService.carousal2[this._screenHolderService.currentScreen].steps;
  }

  // scrollToElement(pageElement) {
  //   this.steps.nativeElement.scrollTo({
  //     top: 300,
  //     behavior: 'smooth'
  //   });
  //   console.log(this.steps.nativeElement);
  // }

  
// onclick(){
//   if(this._screenHolderService.carousal2){
//     console.log("hello",this._screenHolderService.carousal2[this._screenHolderService.currentScreen].steps)
//   }
// }

}
