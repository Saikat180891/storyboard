import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen-holder',
  templateUrl: './screen-holder.component.html',
  styleUrls: ['./screen-holder.component.css']
})
export class ScreenHolderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  checkScrollTop(event){
    console.log(event)
  }

}
