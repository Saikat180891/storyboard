import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar-buttons',
  templateUrl: './sidebar-buttons.component.html',
  styleUrls: ['./sidebar-buttons.component.scss']
})
export class SidebarButtonsComponent implements OnInit {

  @Output('open') open = new EventEmitter<any>();

  openMediaPane:boolean = false;


  constructor() { }

  ngOnInit() {
  }

  onOpenMediaPane(type:string){
    this.openMediaPane = !this.openMediaPane;
    console.log(this.openMediaPane);
    this.open.emit({type:type, shouldOpen: this.openMediaPane});
  }



}
