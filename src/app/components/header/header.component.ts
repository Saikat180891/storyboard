import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
])
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  state: string = 'default';

    rotate() {
        this.state = (this.state === 'default' ? 'rotated' : 'default');
    }

}
