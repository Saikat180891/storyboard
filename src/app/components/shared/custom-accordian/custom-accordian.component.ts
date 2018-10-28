import { Component, OnInit, Input, HostListener } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27,
  ENTER = 13
}


@Component({
  selector: 'app-custom-accordian',
  templateUrl: './custom-accordian.component.html',
  styleUrls: ['./custom-accordian.component.scss'],
  animations: [
    trigger('hide',[
      state('void', style({height:'0px'})),
      // state('*', style({opacity:1, right:'0'})),
      transition('void <=> *',[
        animate('0.5s ease-in')
      ])
    ])
  ]
})
export class CustomAccordianComponent implements OnInit {
  @Input('sectionName') sectionName;

  expand:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onExpand(event){
    console.log(event)
    event.stopPropagation();
    this.expand = !this.expand;
  }

}
