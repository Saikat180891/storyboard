import { Component, OnInit } from '@angular/core';
import {trigger,transition,style,animate,state} from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css', './hamburgers.min.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        left: '0'
      })),
      state('closed', style({
        left: '-260px'
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.2s')
      ]),
    ])
  ]
})
export class SidebarComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  isOpen = false;
 
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
