import { Component, OnInit, HostListener } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  ESCAPE = 27,
  ENTER = 13
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', './hamburgers.min.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        left: '0'
      })),
      state('closed', style({
        left: '-180px'
      })),
      transition('open => closed', [
        animate('0.1s')
      ]),
      transition('closed => open', [
        animate('0.1s')
      ]),
    ]),
    trigger('fadeIn',[
      state('void', style({opacity:0})),
      // state('*', style({opacity:1, right:'0'})),
      transition('void <=> *',[
        animate('0.1s ease-in')
      ])
    ])
  ]
})
export class SidebarComponent implements OnInit {
  panelOpenState = false;

    /**
   * Hide backdrop when escape is pressed
   * @param event 
   */
  @HostListener('document:keyup.escape', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event)
    if (event.keyCode === KEY_CODE.ESCAPE) {
      this.isOpen = false;
    } 
  }

  constructor() { }

  ngOnInit() {
  }

  isOpen = false;
 
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
