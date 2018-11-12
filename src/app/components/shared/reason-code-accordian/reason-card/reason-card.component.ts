import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reason-card',
  templateUrl: './reason-card.component.html',
  styleUrls: ['./reason-card.component.scss']
})
export class ReasonCardComponent implements OnInit {

  @Input() data;
  constructor() { }

  ngOnInit() {
  }

}
