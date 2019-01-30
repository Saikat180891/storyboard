import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'recent-screen-shots',
  templateUrl: './recent-screen-shots.component.html',
  styleUrls: ['./recent-screen-shots.component.scss']
})
export class RecentScreenShotsComponent implements OnInit {
  toggleExpansionPanel:boolean = false;
  @Output('open') open = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit() {
  }

  onExpandPanel(){
    this.toggleExpansionPanel = !this.toggleExpansionPanel;
    this.open.emit(this.toggleExpansionPanel);
  }

}
